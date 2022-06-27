const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash from event input object", () => {
    const key = { test : '2'};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(JSON.stringify(key)).digest("hex")
    expect(trivialKey).toBe(toBe);
  });

  it("Returns the hash from event.partitionKey input object", () => {
    const key = { partitionKey : '2'};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(key.partitionKey).digest("hex")
    expect(trivialKey).toBe(toBe);
  });

  it("Returns the hash from event.partitionKey input object - converting to string", () => {
    const key = { partitionKey : 2};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(JSON.stringify(key.partitionKey)).digest("hex")
    expect(trivialKey).toBe(toBe);
  });

  it("Returns the hash from event input object - converting to string", () => {
    const key = { test : 2};
    const trivialKey = deterministicPartitionKey(key);
    const toBe = crypto.createHash("sha3-512").update(JSON.stringify(key)).digest("hex")
    expect(trivialKey).toBe(toBe);
  });
});
