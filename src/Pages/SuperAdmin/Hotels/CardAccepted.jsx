import React, { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useGet } from '../../../Hooks/useGet';

const HotelAcceptedCards = () => {


    const [acceptedCards] = useState([
        { id: 1, name: 'Visa' },
        { id: 2, name: 'MasterCard' },
        { id: 3, name: 'American Express' },
        { id: 4, name: 'Discover' },
        { id: 5, name: 'JCB' },
        { id: 6, name: 'Diners Club' },
        { id: 7, name: 'UnionPay' }
    ]);

      const { refetch: refetchCard, loading: loadingCard, data: DataCard } = useGet({url:'https://www.travelta.online/api/super/acceptedCards'});
      const [card,setCard] = useState([])

    useEffect(() => {
        refetchCard()
    }, [refetchCard])
 //  data country
    useEffect(() => {
    if(DataCard)
    {
        setCard(DataCard)
    }
    console.log("data DataCard",DataCard )
    }, [DataCard])
    
    const [selectedCards, setSelectedCards] = useState([]);
    const [cardOpen, setCardOpen] = useState(false);

    const handleCardChange = (event) => {
        const value = event.target.name;
        setSelectedCards((prevSelectedCards) =>
            prevSelectedCards.includes(value)
                ? prevSelectedCards.filter((card) => card !== value)
                : [...prevSelectedCards, value]
        );
    };

    return (
        <div className="mb-6 bg-white p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-700">Hotel Accepted Cards</h2>
                <button
                    type="button"
                    onClick={() => setCardOpen(!cardOpen)} // Toggle the state to open/close
                    className="text-blue-500"
                >
                    {cardOpen ? "▲" : "▼"} {/* Arrow toggle */}
                </button>
            </div>

            {cardOpen && (
                <div className="mb-4">
                    <h3 className="text-lg font-medium">All Accepted Cards</h3>
                    <div className="space-y-2 flex flex-col">
                        {acceptedCards.map((card) => (
                            <FormControlLabel
                                key={card.id}
                                control={
                                    <Checkbox
                                        name={card.id.toString()}
                                        checked={selectedCards.includes(card.id.toString())}
                                        onChange={handleCardChange}
                                        className="h-4 w-4"
                                    />
                                }
                                label={card.name}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelAcceptedCards;
