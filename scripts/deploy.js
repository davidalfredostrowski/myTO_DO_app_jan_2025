const hre = require("hardhat")

async function main() {
    const TodoList  = await hre.ethers.getContractFactory("TodoList");
    // deploy contracts
    const todoList  = await TodoList.deploy();
    await todoList.waitForDeployment();
    console.log("todoList deployed to: ", await todoList.getAddress());
    const contractAddress  = await todoList.getAddress();
    saveFrontendFiles(contractAddress  , "TodoList");
}

function saveFrontendFiles(contractAddress, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }


  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
