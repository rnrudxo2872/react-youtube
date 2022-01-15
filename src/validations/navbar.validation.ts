export const SearchValidatoin = {
  validate: (term: string) =>
    term.replace(/\s/g, "").length > 0 || "Spaces are not allowed.",
};
