
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let todoList, owner;

  beforeEach(async function () {

// not working yet!!!!!
    const todoList = await ethers.deployContract("TodoList");

//	  const TodoList = await ethers.getContractFactory("TodoList");
  //  [owner] = await ethers.getSigners();
 //   todoList = await TodoList.deploy();
 //   await todoList.deployed();
  });

  it("should deploy the contract and initialize taskCount to 0", async function () {

    const todoList = await ethers.deployContract("TodoList");
	  const taskCount = await todoList.taskCount();
    expect(taskCount).to.equal(0);
  });

  it("should create a task and emit a TaskCreated event", async function () {


    const todoList = await ethers.deployContract("TodoList");


	  const taskContent = "Test task";
    await expect(todoList.createTask(taskContent)).to.emit(todoList, "TaskCreated").withArgs(1, taskContent, false)


    const taskCount = await todoList.taskCount();
    expect(taskCount).to.equal(1);

    const task = await todoList.tasks(1);
    expect(task.id).to.equal(1);
    expect(task.content).to.equal(taskContent);
    expect(task.completed).to.be.false;
  });

  it("should toggle task completion status and emit a TaskCompleted event", async function () {

    const todoList = await ethers.deployContract("TodoList");





    const taskContent = "Another test task";
    await todoList.createTask(taskContent);

    // Check initial completion status
    let task = await todoList.tasks(1);
    expect(task.completed).to.be.false;

    // Toggle completion status
   await expect(todoList.toggleCompleted(1)).to.emit(todoList, "TaskCompleted").withArgs(1,true)


    // Verify status is updated
  task = await todoList.tasks(1);
    expect(task.completed).to.be.true;

    // Toggle back to false
    await expect(todoList.toggleCompleted(1)).to.emit(todoList, "TaskCompleted").withArgs(1, false);

    task = await todoList.tasks(1);
    expect(task.completed).to.be.false;
  });

//  it("should revert if toggling a non-existent task", async function () {
 //   await expect(todoList.toggleCompleted(1)).to.be.revertedWith("transaction reverted");
//  });
});



