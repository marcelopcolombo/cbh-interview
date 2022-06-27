const crypto = require("crypto");
const { TRIVIAL_PARTITION_KEY } = require("./constants");

const getPartitionKey = (event) => {
  if(event != null)
    return event.partitionKey || event;
}

exports.deterministicPartitionKey = (event) => {
  let partitionKey = getPartitionKey(event);
  if(typeof partitionKey !== "string")
    partitionKey = JSON.stringify(partitionKey);
  
  if(partitionKey)
    return crypto.createHash("sha3-512").update(partitionKey).digest("hex")

  return TRIVIAL_PARTITION_KEY;
};