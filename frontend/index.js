async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  // Array for the two needed endpoints
  const Endpoints = [
    'http://localhost:3003/api/mentors',
    'http://localhost:3003/api/learners',
  ];

  let infoElement = document.querySelector('.info')
  let transformedLeaners;

  try {
    const promises = Endpoints.map(url => axios.get(url));
    const responses = await Promise.all(promises);
    const [mentorsReponse, learnersResponse] = responses;
    const mentors = mentorsReponse.data;
    let learners = learnersResponse.data;

    learners.forEach(learner => {
      const mentorNames = learner.mentors.map(mentorID => {
        const currentMentor = mentors.find(mentor => mentor.id === mentorID);
        return currentMentor.firstName + " " + currentMentor.lastName;
      });
      learner.mentors = mentorNames;
    });
    infoElement.textContent = "No learner is selected";
    createLearnerCards(learners);
    transformedLeaners = learners;
  } catch (error) {
    console.error('Error: ', error);
  }
  
  const learnerCards = document.querySelectorAll('.card');
  learnerCards.forEach(card => card.addEventListener('click', (event) => handleClick(event, card)));

  function mentorsShowHide(mentorHeader) {
    // TODO: set class as open or closed
    if (mentorHeader.classList == 'closed') {
      mentorHeader.classList.remove('closed');
      mentorHeader.classList.add('open');
    } else {
      mentorHeader.classList.remove('open');
      mentorHeader.classList.add('closed');
    }
  }

  function selectLearnerCard(card, learners) {
    // TODO: Add or remove learner's ID from the card
    // let selectedLearnerName = card.children[0].textContent
    // if (selectedLearnerName.indexOf(',') > 0) {
    //   selectedLearnerName = selectedLearnerName.slice(selectedLearnerName.indexOf(','));
    //   console.log(selectedLearnerName.indexOf(','));
    // }
    // const learnerFullName = learners.find(learner => learner.fullName === selectedLearnerName).fullName
    // const learnerID = learners.find(learner => learner.fullName === selectedLearnerName).id
    // // let learnerNameElement = card.children[0];
    // // console.log(learnerFullName, learnerID);
    // infoElement.textContent = "The selected learner is " + selectedLearnerName
    // let activeCard = document.querySelector('.card.selected');
    // if (card.classList == 'card') {
    //   if (activeCard !=null && activeCard != card) {
    //     activeCard.classList.remove('selected');
    //     // TODO remove ID from previously selected learner
    //   }
    //   card.classList.add('selected');
    //   card.children[0].textContent = `${learnerFullName}, ID ${learnerID}`;
    // } else {
    //   card.classList.remove('selected');
    //   card.children[0].textContent = `${learnerFullName}`;
    // }
  }

  function handleClick(event, card) {
    const mentorHeader = card.children[2]
    // let previousClick = card;
    let clickedElement = event.target;
    if (clickedElement == mentorHeader) {
      mentorsShowHide(mentorHeader);
      selectLearnerCard(card, transformedLeaners);
    } else {
      selectLearnerCard(card, transformedLeaners);
    }
  }

  function createLearnerCards(learners) {
    console.log(learners)
    // create learner cards from the learners array
    let cards = document.querySelector('.cards');
    learners.forEach(learner => {
      let card = document.createElement('div');
      card.classList.add('card');
      let nameID = document.createElement('h3');
      let email = document.createElement('div');
      let mentorsHeader = document.createElement('h4');
      mentorsHeader.textContent = "Mentors";
      mentorsHeader.classList.add('closed')
      let mentorsList = document.createElement('ul');
      learner.mentors.forEach(mentor => {
        // console.log(mentor)
        let mentorName = document.createElement('li');
        mentorName.textContent = mentor;
        mentorsList.appendChild(mentorName);
      });
      
      nameID.textContent = learner.fullName;
      email.textContent = learner.email;
      [nameID, email, mentorsHeader, mentorsList].forEach(element => card.appendChild(element))
      cards.appendChild(card)
    });
    
  }
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
