const potentialNames: Record<string, string[]> = {
  Vince: ["Mellow Corn"],
  Grant: ["Boatboy"],
  Jake: ["ABBA #1 Fan"],
  Sunny: ["The Fairy Goth"],
  Roy: ["Huckleberry Sizzlah"],
  Tina: ["Pickles", "Resident Lawyer"]
};

const targetNumber: number = 0.022;

export default (targetName: string) => {
  if (Math.random() <= targetNumber)
  {
    const match = Object.keys(potentialNames).find(k =>
      k.toLowerCase().startsWith(targetName.toLowerCase())
    );

    if (match) {
        const aliases: string[] = potentialNames[match];
        const alias = aliases[Math.floor(Math.random() * aliases.length)];
        return alias;
    }
  }
  return targetName;
}