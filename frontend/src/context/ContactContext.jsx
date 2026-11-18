import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api.js";

export const FALLBACK_CONTACT = Object.freeze({
  phone: "+91-7008259050",
  email: "acharyajayantji@gmail.com",
  address: "New Amalipali, Sundargarh, 770001, Odisha",
});

const ContactContext = createContext(FALLBACK_CONTACT);

function resolveContact(dynamicContact = {}) {
  return Object.fromEntries(
    Object.keys(FALLBACK_CONTACT).map((field) => {
      const value = typeof dynamicContact[field] === "string" ? dynamicContact[field].trim() : "";
      return [field, value || FALLBACK_CONTACT[field]];
    }),
  );
}

export function ContactProvider({ children }) {
  const [contact, setContact] = useState(FALLBACK_CONTACT);
  const updateContact = (dynamicContact) => setContact(resolveContact(dynamicContact));

  useEffect(() => {
    let active = true;
    apiRequest("contact")
      .then(({ contact: dynamicContact }) => {
        if (active) updateContact(dynamicContact);
      })
      .catch((error) => {
        console.error("Could not load dynamic contact details; using the static defaults.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return <ContactContext.Provider value={{ ...contact, updateContact }}>{children}</ContactContext.Provider>;
}

export function useContact() {
  return useContext(ContactContext);
}

export function phoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
