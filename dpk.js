const crypto = require("crypto");
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./constants");

const getPartitionKey = (event) => {
  if(!event)
    return null;

  if(event.partitionKey){
    partitionKey= event.partitionKey
  } else {
    const data = JSON.stringify(event);
    partitionKey =  createSha3_512Hash(data);
  }
   
  return partitionKey;
}

const createSha3_512Hash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
} 

exports.deterministicPartitionKey = (event) => {
  let partitionKey = getPartitionKey(event);

  if(!partitionKey)
    return TRIVIAL_PARTITION_KEY;

  if(typeof partitionKey !== "string")
    partitionKey = JSON.stringify(partitionKey);
  
  if(partitionKey.length > MAX_PARTITION_KEY_LENGTH)
    partitionKey = createSha3_512Hash(partitionKey);

  return partitionKey;
};