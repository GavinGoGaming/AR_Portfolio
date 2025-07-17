export default function Cards({cards, setOpen}: any) {
    return (
        <>
            {cards.map((card: any) => (
                <div key={card.id} className="card" onClick={setOpen.bind(null, card.id-1)}>
                    <img
                        src={card.url}
                        alt={card.title}
                        className="card-image"
                    />
                </div>
            ))}
        </>
    );
}