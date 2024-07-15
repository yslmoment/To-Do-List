// 모든 'circle-button' 요소를 선택
const buttons = document.querySelectorAll('.circle-button');
const addButton = document.getElementById('add-button');
const popup = document.getElementById('popup');
const saveButton = document.getElementById('save-button');
const titleInput = document.getElementById('title-input');
const memoInput = document.getElementById('memo-input');
const todoList = document.getElementById('todo-list');
const memoPopup = document.getElementById('memo-popup');
const memoText = document.getElementById('memo-text');
const closeMemoButton = document.getElementById('close-memo-button');
let editMode = false;
let currentEditLi = null;

// 할 일 완료 처리 이벤트 리스너
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 전파 중지
        const li = button.parentElement; // 해당 버튼의 부모 요소(li)를 선택
        const task = li.querySelector('.task'); // 해당 li 내부의 task(span) 요소를 선택

        if (!li.classList.contains('completed')) {
            // 완료되지 않은 경우, 완료 표시
            task.classList.add('completed');
            li.classList.add('completed');
            button.classList.add('filled'); // 버튼에 색을 채움
            todoList.appendChild(li); // 완료된 항목을 목록의 마지막으로 이동
        } else {
            // 이미 완료된 항목을 다시 클릭한 경우, 완료 표시 제거
            task.classList.remove('completed');
            li.classList.remove('completed');
            button.classList.remove('filled'); // 버튼 색을 제거
        }
    });
});

// 할 일 항목 추가 버튼 클릭 시 팝업 표시
addButton.addEventListener('click', () => {
    editMode = false;
    titleInput.value = ''; // 입력 필드 초기화
    memoInput.value = ''; // 메모 입력 필드 초기화
    saveButton.textContent = 'Add'; // 버튼 텍스트 변경
    popup.style.display = 'flex'; // 팝업 표시
});

// 새 할 일 항목 추가 후 저장 버튼 클릭 시
saveButton.addEventListener('click', () => {
    const newTaskTitle = titleInput.value.trim();
    const newTaskMemo = memoInput.value.trim();

    if (newTaskTitle !== '') {
        if (editMode && currentEditLi) {
            // 수정 모드인 경우, 기존 항목 수정
            currentEditLi.querySelector('.task').textContent = newTaskTitle;
            currentEditLi.setAttribute('data-memo', newTaskMemo);
        } else {
            // 새로운 항목 추가
            const newLi = document.createElement('li');
            newLi.innerHTML = `<button class="circle-button"></button> <span class="task">${newTaskTitle}</span>`;
            newLi.setAttribute('data-memo', newTaskMemo);

            // 새로운 버튼에 이벤트 리스너 추가
            newLi.querySelector('.circle-button').addEventListener('click', (e) => {
                e.stopPropagation(); // 이벤트 전파 중지
                const button = e.target;
                const li = button.parentElement;
                const task = li.querySelector('.task');

                if (!li.classList.contains('completed')) {
                    task.classList.add('completed');
                    li.classList.add('completed');
                    button.classList.add('filled');
                    todoList.appendChild(li);
                } else {
                    task.classList.remove('completed');
                    li.classList.remove('completed');
                    button.classList.remove('filled');
                }
            });

            // 새로운 항목을 완료된 항목들 위에 추가
            const completedItems = Array.from(todoList.children).filter(li => li.classList.contains('completed'));
            if (completedItems.length > 0) {
                todoList.insertBefore(newLi, completedItems[0]);
            } else {
                todoList.appendChild(newLi);
            }

            // 항목 클릭 시 메모 표시 이벤트 리스너 추가
            newLi.addEventListener('click', (e) => {
                if (e.target.classList.contains('circle-button')) return; // 동그라미 버튼 클릭 시 무시
                memoText.innerText = newTaskMemo;
                memoPopup.style.display = 'flex';
            });

            // 항목 우클릭 시 수정 팝업 표시
            newLi.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                editMode = true;
                currentEditLi = newLi;
                titleInput.value = newTaskTitle;
                memoInput.value = newTaskMemo;
                saveButton.textContent = 'Save';
                popup.style.display = 'flex';
            });
        }
    }

    popup.style.display = 'none'; // 팝업 숨기기
});

// 기존 항목에 클릭 이벤트 추가 (메모 표시)
document.querySelectorAll('#todo-list li').forEach(li => {
    li.addEventListener('click', (e) => {
        if (e.target.classList.contains('circle-button')) return; // 동그라미 버튼 클릭 시 무시
        memoText.innerText = li.getAttribute('data-memo');
        memoPopup.style.display = 'flex';
    });

    // 기존 항목에 우클릭 이벤트 추가 (수정 팝업 표시)
    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        editMode = true;
        currentEditLi = li;
        titleInput.value = li.querySelector('.task').textContent;
        memoInput.value = li.getAttribute('data-memo');
        saveButton.textContent = 'Save';
        popup.style.display = 'flex';
    });
});

// 메모 팝업 닫기 버튼 클릭 시
closeMemoButton.addEventListener('click', () => {
    memoPopup.style.display = 'none';
});
