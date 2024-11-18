import Card from "./Card";
//This function returns the foundation component so  that it can be used in other components

function Foundation({ foundation, onDragStart, onDrop }) {
    if (!foundation || !foundation.piles) {
        return <div>Loading Foundation...</div>;
    }

    return (
        <div className="foundation">
            {Object.keys(foundation.piles).map((suit) => {
                const pile = foundation.piles[suit];
                const topCard = pile.isEmpty() ? null : pile.top();

                return (
                    <div
                        key={suit}
                        className="foundation-pile"
                        onDrop={(event) => onDrop(event, suit, 'foundation')}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Card
                            card={topCard}
                            faceUp={!!topCard}
                            onDragStart={(event) => onDragStart(event, 'foundation', suit)}
                            pileType="foundation"
                        />
                    </div>
                );
            })}
        </div>
    );
}
export default Foundation