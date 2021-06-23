const taskContainer = document.querySelector(".task__container");

const globalStore = [];

const generateNewCard = (taskData) =>
  `
  <div class="col-md-6 col-lg-4" id=${taskData.id}>
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-success">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button type="button" class="btn btn-outline-danger">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <img
      src=${taskData.imageUrl}
      class="card-img-top img-fluid w-100"
      alt="Card Image"
      style="width: 18rem"
    />
    <div class="card-body">
      <h5 class="card-title">${taskData.taskTitle}</h5>
      <p class="card-text">
      ${taskData.taskDescription}
      </p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-outline-primary float-end">
        Open Task
      </button>
    </div>
  </div>
</div>
`;

const loadInitialCardData = () => {
  //local storage to get tasky card data

  const getCardData = localStorage.getItem("tasky");

  //convert from string to normal object
  const { cards } = JSON.parse(getCardData);

  //loop over those array of task objects to create HTML card, inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStore.push(cardObject);
  });
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // generate unique number every time
    imageUrl: document.getElementById("imageUrl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
};
