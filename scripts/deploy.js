async function main() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");

    // Start deployment of contract, return promise that resolves into contract obj
    const hello_world = await HelloWorld.deploy("Hello World!");
    console.log("Contract deployed to address: ", hello_world.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => { 
        console.error(error);
        process.exit(1);
    });