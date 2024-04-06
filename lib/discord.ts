// Define the list of strings
const discordMembersList: string[] = [
    "alinalatinina",
    "babybit",
    "blackicon",
    "carlonftitalia",
    "cryptogallo",
    "vdarph",
    "deca12x",
    "drunnn",
    "0xemi",
    "ethanolo.eth",
    "fabriziogianni7",
    "fante94",
    "finding_blocks",
    "frank_c",
    "herminius.eth",
    "jondar_eth",
    "limone.eth",
    "matteoikari.eth",
    "mctflurry",
    "fantamellow",
    "mrpsycox.eth",
    "oldyoung",
    "orbulo",
    "pg_cdg",
    "rollingboat",
    "71196",
    "neutronval",
    "zerg_drone"
];

// Function to check if the input string matches any string in the list
export function matchString(input: string): string {
    for (const str of discordMembersList) {
        if (input === str) {
            return str;
        }
    }
    return ""; // Return empty string if no match is found
}