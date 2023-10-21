async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇transformedLearners
  // Array for the two needed endpoints
  const Endpoints = [
    'http://localhost:3003/api/mentors',
    'http://localhost:3003/api/learners',
  ];

  let transformedLearners;
  let infoElement = document.querySelector('.info')

  function infoElementUpdate(name) {
    if (name == undefined) {
        infoElement.textContent = "No learner is selected";
    } else {
        infoElement.textContent = "The selected learner is " + name;
    }
  }
  
  function createLearnerCards(learners) {
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

  try {
    const promises = Endpoints.map(url => axios.get(url));
    const responses = await Promise.all(promises);
    const [mentorsReponse, learnersResponse] = responses;
    const mentors = mentorsReponse.data;
    let learners = learnersResponse.data;

    learners.forEach(learner => {
      let mentorNames = learner.mentors.map(mentorID => {
        const currentMentor = mentors.find(mentor => mentor.id === mentorID);
        return currentMentor.firstName + " " + currentMentor.lastName;
      });
      learner.mentors = mentorNames;
    });
    infoElementUpdate();
    createLearnerCards(learners);
    transformedLearners = learners;
  } catch (error) {
    console.error('Error: ', error);
  }
  
  let learnerCards = document.querySelectorAll('.card');
  learnerCards.forEach(card => card.addEventListener('click', (event) => handleClick(event, card)));

  function sliceNameFromID(textContent) {
    return textContent.slice(0, textContent.indexOf(','));
  }

  function removeSelectedClassName(card) {
    card.classList.remove('selected');
  }

  function toggleLearnerCard(card, learners) {
    // Get the current string for the cards first element (IE Name and possibly ID if currently active)
    let selectedLearnerName = card.children[0].textContent
    // if comma index is not -1, indicating that the card is currently selected
    if (selectedLearnerName.indexOf(',') != -1) {
        //then we "chop" the comma and ID off to get the name only
        selectedLearnerName = sliceNameFromID(selectedLearnerName)
    }
    // get the learners ID from the data using their name
    const learnerID = learners.find(learner => learner.fullName === selectedLearnerName).id
    // Update the info class element to display what learner is selected
    infoElementUpdate(selectedLearnerName);
    // assign a variable for potentially currently selected learner card
    let activeCard = document.querySelector('.card.selected');
    // if the clicked learner card is not currently selected
    if (card.classList == 'card') {
        // if there is currently an active learner card and it is not the card we selected
        if (activeCard !=null && activeCard != card) {
            // mark the previous learner card as not selected since a new card was clicked
            removeSelectedClassName(activeCard);
            // TODO: remove ID from previously selected learner card
            const previousLearnerName = sliceNameFromID(activeCard.children[0].textContent)
            activeCard.children[0].textContent = previousLearnerName;
      }
      // then mark the clicked card as selected
      card.classList.add('selected');
      // append leaner's ID to end of their name
      card.children[0].textContent += `, ID ${learnerID}`;
    } else {
        // otherwise if it was selected it is now unselected
        removeSelectedClassName(card);
        // remove the ID from the end of name
        card.children[0].textContent = selectedLearnerName;
        // update info class element that no learner is selected
        infoElementUpdate();
    }
  }

  function toggleMentors(mentorHeader) {
    // TODO: set class as open or closed
    if (mentorHeader.classList == 'closed') {
      mentorHeader.classList.remove('closed');
      mentorHeader.classList.add('open');
    } else {
      mentorHeader.classList.remove('open');
      mentorHeader.classList.add('closed');
    }
  }
  
  function handleClick(event, card) {
    const mentorHeader = card.children[2]
    let clickedElement = event.target;
    // if clickedelement is mentorHeader and the Learner card is active
    if (clickedElement == mentorHeader && card.classList == 'card selected') {
      // then call showHideMentors
      toggleMentors(mentorHeader);
    // if clickedelement is mentorHeader and the Learner card is not active 
    } else if (clickedElement == mentorHeader && card.classList == 'card') {
      // then call showHideMentors and activateLCard
      toggleMentors(mentorHeader);
      toggleLearnerCard(card, transformedLearners);
    } else {
      // otherwise activate or deactive card
      toggleLearnerCard(card, transformedLearners);
    }
  }
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
