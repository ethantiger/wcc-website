"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContainer, SidebarBody, SidebarButton } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";


import { useLogout } from "../hooks/useLogout";

export default function Sidebar() {
  const { logout } = useLogout();


  const [open, setOpen] = useState(false);

  return (
    <SidebarContainer open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            <SidebarButton link={{ label: "Carpools", icon: <IconBrandTabler /> }} />
            <SidebarButton link={{ label: "Profile", icon: <IconUserBolt /> }} />
          </div>
        </div>
        <div>
          <SidebarButton link={{ label: "Logout", icon: <IconArrowLeft /> }} onClick={logout} />
        </div>
      </SidebarBody>
    </SidebarContainer>
  );
}

const Logo = () => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => navigate("/")}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black hover:cursor-pointer"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Back to Website
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black hover:cursor-pointer"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
