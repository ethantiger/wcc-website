export default function About() {
  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="max-w-2xl text-center mb-4">
          Welcome to our climbing community! We are passionate about bouldering, sport climbing, and all things climbing-related. Our mission is to connect climbers of all levels and provide resources, events, and a supportive environment to help you reach new heights.
        </p>
        <p className="max-w-2xl text-center">
          Whether you're a beginner looking for tips or an experienced climber seeking new challenges, you'll find a welcoming community here. Join us for climbing sessions, workshops, and social events. Let's climb together!
        </p>
      </div>
    </section>
  );
}