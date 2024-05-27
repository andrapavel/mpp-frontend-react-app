export function generateID(): number {
    // Generate a random number and convert it to a string
    const randomId = Date.now() + Math.floor(Math.random() * 1000);
    return randomId;
}
