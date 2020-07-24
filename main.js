(function () {
  const ttl = document.getElementById('title');
  const txt = document.getElementById('text');
  const detail = document.getElementById('detail');
  const cat = document.getElementById('category');
  const dif = document.getElementById('difficulty');
  const btn = document.getElementById('button');
  const home = document.getElementById('home');
  const list = document.getElementById('list');
  let count = 0;
  let correct = 0;

  const select = (elem, data, answer) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    if(answer) {
      btn.classList.add('correct');
    }
    btn.textContent = elem;
    li.appendChild(btn);
    list.appendChild(li);
    btn.addEventListener('click', () => {
      if(btn.classList.contains('correct')) {
        correct++;
        console.log(correct);
      }
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      count++;
      question(count, data);
    });
  }
  const question = (count, data) => {
    if(count < 10) {
      ttl.textContent = `問題${count + 1}`;
      txt.textContent = data.results[count].question;
      detail.style.display = 'block';
      cat.textContent = data.results[count].category;
      dif.textContent = data.results[count].difficulty;
      data.results[count].incorrect_answers.forEach(elem => {
        select(elem, data, false);
      });
      select(data.results[count].correct_answer, data, true);
      var ul = document.querySelector('ul');
      for (var i = list.children.length; i >= 0; i--) {
          list.appendChild(list.children[Math.random() * i | 0]);
      }
    } else {
      ttl.textContent = `あなたの正解数は${correct}です！！`;
      txt.textContent = '再度チャレンジする場合は以下をクリックしてください';
      detail.style.display = 'none';
      home.style.display = 'block';
    }
  };
  home.addEventListener('click', () => {
    ttl.textContent = 'ようこそ';
    txt.textContent = '以下のボタンをクリック';
    detail.style.display = 'none';
    home.style.display = 'none';
    btn.style.display = 'block';
    count = 0;
    correct = 0;
  });
  btn.addEventListener('click', () => {
    ttl.textContent = '取得中';
    txt.textContent = '少々お待ちください';
    btn.style.display = 'none';
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        question(count, data);
      });
    });
}());
