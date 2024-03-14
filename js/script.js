document.getElementById('draw').addEventListener('click', () => {
    fetchNewDeckAndDrawCards();
});

const fetchNewDeckAndDrawCards = async () => {
    try {
        // fetch a new deck
        const deckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const deckData = await deckResponse.json();
        const deckId = deckData.deck_id;

        // draw cards
        const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
        const drawData = await drawResponse.json();
        const cards = drawData.cards;

        // show em
        displayCards(cards);
    } catch (error) {
        console.error('Failed to fetch and draw cards:', error);
    }
};

const displayCards = (cards) => {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        const image = document.createElement('img');
        image.src = card.image;
        cardElement.appendChild(image);
        cardsContainer.appendChild(cardElement);
    });
};
