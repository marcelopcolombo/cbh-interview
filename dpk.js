const crypto = require("crypto");
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./constants");

const getPartitionKey = (event) => {
  if(!event)
    return null;

  if(event.partitionKey){
    partitionKey= event.partitionKey
  } else {
    let data = JSON.stringify(event);
    partitionKey =  crypto.createHash("sha3-512").update(event).digest("hex")
  }
   
  return partitionKey;
}

exports.deterministicPartitionKey = (event) => {
  let partitionKey = getPartitionKey(event);

  if(!partitionKey)
    return TRIVIAL_PARTITION_KEY;

  if(typeof partitionKey !== "string")
    partitionKey = JSON.stringify(partitionKey);
  
  if(partitionKey.length > MAX_PARTITION_KEY_LENGTH)
    return crypto.createHash("sha3-512").update(partitionKey).digest("hex")

  return partitionKey;
};