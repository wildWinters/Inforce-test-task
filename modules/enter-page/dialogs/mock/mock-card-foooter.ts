interface IMockCardFooter {
  id: string;
  label: string;
  loadingLabel?: string; 
  type: string;
  onClick: () => void;
  className: string;
  disabledStates: string[];
  variant?: string; 
}

export const mockCardFooter: IMockCardFooter[] = [
  {
    id: "confirm",
    label: "Confirm",
    loadingLabel: "Saving...",
    type: "submit",
    onClick: () => alert("naruto"),
    className: "w-full text-sm py-2",
    disabledStates: ["isSubmitting", "isSaving", "isFetching"]
  },
  {
    id: "cancel",
    label: "Cancel",
    type: "button",
    onClick: () => console.log("reset called"),
    className: "w-full text-sm py-2",
    disabledStates: ["isSaving", "isFetching"],
    variant: "secondary"
  }
];
