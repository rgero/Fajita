const potentialNames: Record<string, string[]> = {
  Vince: ["Mellow Corn", "Vincenzo", "Tom Hardy", "Rufio", "halfblake", "arcadia"],
  Anna: ["Millie's Mom", "Dr. Sleepy", "Geminni"],
  Grant: ["Boatboi", "Cloud Plumber"],
  Jake: ["ABBA #1 Fan", "Jacob", "Cubbie", "bestjake", "American Folk Hero", "artimus"],
  Sunny: ["The Fairy Goth Mother", "LOTR Loremaster", "Admiral Snackbar"],
  Roy: ["Huckleberry Sizzlah", ".-. --- -.--"],
  Tina: ["Pickles", "Single Female Lawyer"],
  Kristen: ["Frankel's #1 Fan"],
  Lauren: ["üwü", "BestGirl", "H3110"],
  Mike: ["TrumpetEgo", "blow_my_horn"]
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