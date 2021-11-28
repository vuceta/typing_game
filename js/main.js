(function () {
  let startBtn = $(".start-btn");
  let mainInput = $(".main-input");
  let allLines = $(".line");
  let allText = [];
  let score = 0;
  let displayResult = $(".display-result");

  startBtn.on("click", startGame);

  function startGame() {
    $(this).hide();
    mainInput.focus();
    //setup

    let speed = 1;
    let textLength = 3;
    let typingWord = words.filter((word) => word.length === textLength);
    let lvl = 6;

    let speedUp = setInterval(function () {
      textLength++;
      typingWord = words.filter((word) => word.length === textLength);
    }, 15000);

    mainInput.on("keyup", checkInputTyping);
    function checkInputTyping() {
      let inputVal = $(this).val();
      let self = $(this);
      if (allText.includes(inputVal)) {
        $("span")
          .filter(function () {
            return $(this).text() === inputVal;
          })
          .remove();
        self.val("");
        score++;
        displayResult.text(score);
      }
    }

    //insert spans

    function insertSpans() {
      for (let i = 0; i < allLines.length; i++) {
        let random = Math.floor(Math.random() * 20);
        console.log(random);
        if (random <= lvl) {
          let text = chooseText();
          allText.push(text);
          $(allLines[i]).append(`<span>${text}</span>`);
        }
      }
      setTimeout(insertSpans, 7000);
    }
    insertSpans();

    function chooseText() {
      let random = Math.floor(Math.random() * typingWord.length);
      let savedText = typingWord[random];
      typingWord.splice(random, 1);

      return savedText;
    }

    //animacija span

    let moveAll = setInterval(function () {
      let allSpans = $("span");
      allSpans.css({
        left: "+=" + speed,
      });
      //testiranje
      $.each(allSpans, (index, el) => {
        let position = $(el).position().left;
        if (position > 850) {
          clearIntervals();
        } else if (position > 400 && position < 700) {
          $(el).addClass("middle");
        }
        if (position > 700) {
          $(el).removeClass("middle");
          $(el).addClass("danger");
        }
      });
    }, 100);

    function clearIntervals() {
      clearInterval(moveAll);
    }
  }
})();
