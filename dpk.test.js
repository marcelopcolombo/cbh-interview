const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash from event input object", () => {
    const key = 'qwerty';
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(key).digest("hex")
    expect(trivialKey).toBe(toBe);
  });

  it("Returns the hash from event.partitionKey input object", () => {
    const key = { partitionKey : '2'};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(key.partitionKey).digest("hex")
    expect(trivialKey).toBe('2');
  });

  it("Returns the hash from event.partitionKey input object - converting to string", () => {
    const key = { partitionKey : 2};
    const trivialKey = deterministicPartitionKey(key);
    expect(trivialKey).toBe('2');
  });

  it("Returns the hash from event.partitionKey input object - hash if > than 256", () => {
    const key = { partitionKey : `
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaa
    `};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(key.partitionKey).digest("hex")
    expect(trivialKey).toBe(toBe);
  });
});
