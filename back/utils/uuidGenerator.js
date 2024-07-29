exports.Get = async function () {
    // Generate a random number between 0 and 15, inclusive
    const randomDigit = () => Math.floor(Math.random() * 16);
    
    // Create a template for the UUID
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    
    // Replace the placeholders in the template with random digits
    const uuid = template.replace(/[xy]/g, (c) => {
      const r = randomDigit();
      const v = c === 'x' ? r : (r & 0x3) | 0x8; // y position has limited choices (8, 9, A, or B)
      return v.toString(16);
    });
    
    return uuid;
}