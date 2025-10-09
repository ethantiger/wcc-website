import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

describe('Firestore Rules Test', () => {
  let testEnv;
  let authenticatedDb;
  let unauthenticatedDb;
  let uwoUserDb;
  let nonUwoUserDb;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'test-project',
      firestore: {
        rules: readFileSync('firestore.rules', 'utf8'),
      },
    });

    // Create different authenticated contexts
    authenticatedDb = testEnv.authenticatedContext('test-user-id', {
      email: 'test@uwo.ca',
    }).firestore();

    uwoUserDb = testEnv.authenticatedContext('uwo-user-id', {
      email: 'student@uwo.ca',
    }).firestore();

    nonUwoUserDb = testEnv.authenticatedContext('non-uwo-user-id', {
      email: 'user@gmail.com',
    }).firestore();

    unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  describe('Users Collection Rules', () => {
    test('UWO users can read users collection', async () => {
      await assertSucceeds(getDoc(doc(uwoUserDb, 'users', 'test-user')));
    });

    test('Non-UWO users cannot read users collection', async () => {
      await assertFails(getDoc(doc(nonUwoUserDb, 'users', 'test-user')));
    });

    test('Unauthenticated users cannot read users collection', async () => {
      await assertFails(getDoc(doc(unauthenticatedDb, 'users', 'test-user')));
    });

    test('UWO users can create user documents', async () => {
      await assertSucceeds(
        setDoc(doc(uwoUserDb, 'users', 'uwo-user-id'), {
          displayName: 'Test User',
          email: 'student@uwo.ca',
        })
      );
    });

    test('Non-UWO users cannot create user documents', async () => {
      await assertFails(
        setDoc(doc(nonUwoUserDb, 'users', 'non-uwo-user-id'), {
          displayName: 'Test User',
          email: 'user@gmail.com',
        })
      );
    });
  });

  describe('Carpools Collection Rules', () => {
    test('UWO users can read carpools', async () => {
      // First create a carpool document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'test-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['owner-id'],
          maxPeople: 4,
        });
      });

      await assertSucceeds(getDoc(doc(uwoUserDb, 'carpools_test', 'test-carpool')));
    });

    test('Non-UWO users cannot read carpools', async () => {
      await assertFails(getDoc(doc(nonUwoUserDb, 'carpools_test', 'test-carpool')));
    });

    test('UWO users can create carpools with their own userId', async () => {
      await assertSucceeds(
        setDoc(doc(uwoUserDb, 'carpools_test', 'new-carpool'), {
          userId: 'uwo-user-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['uwo-user-id'],
          maxPeople: 4,
        })
      );
    });

    test('UWO users cannot create carpools with another user\'s userId', async () => {
      await assertFails(
        setDoc(doc(uwoUserDb, 'carpools_test', 'new-carpool'), {
          userId: 'different-user-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['different-user-id'],
          maxPeople: 4,
        })
      );
    });

    test('Carpool owners can update their carpools', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'owner-carpool'), {
          userId: 'uwo-user-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['uwo-user-id'],
          maxPeople: 4,
        });
      });

      await assertSucceeds(
        updateDoc(doc(uwoUserDb, 'carpools_test', 'owner-carpool'), {
          destination: 'Ottawa',
        })
      );
    });

    test('Non-owners cannot update carpools if carpool is not open', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'protected-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Closed',
          people: ['owner-id'],
          maxPeople: 4,
        });
      });

      // Different user trying to change destination
      const otherDb = testEnv.authenticatedContext('other-user-id', {
        email: 'other@uwo.ca',
      }).firestore();

      await assertFails(
        updateDoc(doc(otherDb, 'carpools_test', 'protected-carpool'), {
          destination: 'Ottawa',
        })
      );
    })

    test('Non-owners can join open carpools by updating people array', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'joinable-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['owner-id'],
          maxPeople: 4,
        });
      });

      // Different user trying to join
      const joinerDb = testEnv.authenticatedContext('joiner-id', {
        email: 'joiner@uwo.ca',
      }).firestore();

      await assertSucceeds(
        updateDoc(doc(joinerDb, 'carpools_test', 'joinable-carpool'), {
          people: ['owner-id', 'joiner-id'],
        })
      );
    });

    test('Non-owners cannot update fields other than people array', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'protected-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['owner-id'],
          maxPeople: 4,
        });
      });

      // Different user trying to change destination
      const otherDb = testEnv.authenticatedContext('other-user-id', {
        email: 'other@uwo.ca',
      }).firestore();

      await assertFails(
        updateDoc(doc(otherDb, 'carpools_test', 'protected-carpool'), {
          destination: 'Ottawa',
        })
      );
    });

    test('Non-owners can request to join carpools with status RequestToJoin', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'requestable-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'RequestToJoin',
          people: ['owner-id'],
          requests: [],
          maxPeople: 4,
        });
      });

      // Different user trying to join
      const joinerDb = testEnv.authenticatedContext('joiner-id', {
        email: 'joiner@uwo.ca',
      }).firestore();

      await assertSucceeds(
        updateDoc(doc(joinerDb, 'carpools_test', 'requestable-carpool'), {
          requests: ['joiner-id'],
        })
      );
    });

    test('Non-owners can leave carpool when they are part of the people array', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'leavable-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'RequestToJoin',
          people: ['owner-id', 'member-id'],
          maxPeople: 4,
        });
      });

      const joinerDb = testEnv.authenticatedContext('member-id', {
        email: 'joiner@uwo.ca',
      }).firestore();

      await assertSucceeds(
        updateDoc(doc(joinerDb, 'carpools_test', 'leavable-carpool'), {
          people: ['owner-id'],
        })
      );
    });

    test('Only carpool owners can delete their carpools', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'deletable-carpool'), {
          userId: 'uwo-user-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['uwo-user-id'],
          maxPeople: 4,
        });
      });

      await assertSucceeds(deleteDoc(doc(uwoUserDb, 'carpools_test', 'deletable-carpool')));
    });

    test('Non-owners cannot delete carpools', async () => {
      // Create carpool with security rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'carpools_test', 'protected-carpool'), {
          userId: 'owner-id',
          location: 'London',
          destination: 'Toronto',
          status: 'Open',
          people: ['owner-id'],
          maxPeople: 4,
        });
      });

      await assertFails(deleteDoc(doc(uwoUserDb, 'carpools_test', 'protected-carpool')));
    });
  });

  describe('Events Collection Rules', () => {
    test('Anyone can read events', async () => {
      await assertSucceeds(getDoc(doc(unauthenticatedDb, 'events_test', 'test-event')));
      await assertSucceeds(getDoc(doc(uwoUserDb, 'events_test', 'test-event')));
      await assertSucceeds(getDoc(doc(nonUwoUserDb, 'events_test', 'test-event')));
    });

    test('Only specific admin can create/update/delete events', async () => {
      const adminDb = testEnv.authenticatedContext('YFJw0QC8QRTC0qiiZH6rSiD8Rkg2', {
        email: 'admin@uwo.ca',
      }).firestore();

      await assertSucceeds(
        setDoc(doc(adminDb, 'events_test', 'new-event'), {
          title: 'Test Event',
          description: 'A test event',
        })
      );

      await assertFails(
        setDoc(doc(uwoUserDb, 'events_test', 'new-event'), {
          title: 'Test Event',
          description: 'A test event',
        })
      );
    });
  });
});