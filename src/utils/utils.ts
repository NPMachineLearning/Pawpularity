export const getCssUnit = (
  value: any,
  mapper: { [key: string]: string } = { number: "px", string: "" }
) => {
  const unit = mapper[typeof value];
  return unit ? unit : "";
};
