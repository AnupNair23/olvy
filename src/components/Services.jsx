import React, { useState, useEffect, useReducer, useRef } from 'react';
import { FiUser } from 'react-icons/fi'
import { AiOutlineHighlight, AiFillStar } from 'react-icons/ai'
import { MdOutlineDescription } from 'react-icons/md'
import reducer from '../reducer/reducer'

const Services = (props) => {

    const initialState = {
        review: 0
    };

    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [review, setReview] = useState(1)
    const [hightlight, setHighlight] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showHightlight, setShowHighlight] = useState(false)
    const idRef = useRef(0);

    const getData = () => {
        //api call to get and load data to dom
        fetch(`https://amazon-review.s3.ap-south-1.amazonaws.com/data.json`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(async (response) => {
                return response.json();
            })
            .then(async (myJson) => {
                setData(myJson)
                setLoad(!load)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const scrollDifference = (first, sec) => {
        return Math.abs(first - sec);
    }

    useEffect(() => {
        if (!props.data)
            getData()
        //adding listener to the scroll for additional data loading to dom
        document.getElementById("reviewBlock").addEventListener("scroll", function () {
            let diff = scrollDifference((this.scrollTop + this.clientHeight), (this.scrollHeight));

            if (diff < 1) {
                setReview(preReview => preReview + 1)
                idRef.current = dispatch({ type: 'increment' })
                getData()
                // }, 0);
            }
        });
    }, [state.review])

    const callHighlight = () => {
        setHighlight(!hightlight)
        setLoad(true)
    }

    const reviewStars = (overall) => {
        switch (overall) {
            case 1:
                return <span className='flex'><AiFillStar /></span>
            case 2:
                return <span className='flex'><AiFillStar /> <AiFillStar /></span>
            case 3:
                return <span className='flex'><AiFillStar /> <AiFillStar /> <AiFillStar /> </span>
            case 4:
                return <span className='flex'><AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /></span>

            case 5:
                return <span className='flex'><AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /></span>

        }
    }

    const handleSearchChange = (e) => {
        const { value } = e.target
        const lowercasedValue = value.toLowerCase();
        if(value === "")
            getData()
        setData(prevState => {
            const filteredData = prevState.filter(el => el.reviewText.toLowerCase().includes(lowercasedValue))
            return filteredData
        })
    }

    return (
        //review block
        <>
            <div className='flex justify-end items-center px-5 py-1 mr-5 relative'>
                <input onChange={handleSearchChange} className='checked:bg-blue-500 mr-4 p-1 px-2 rounded' placeholder="Search" />
                <AiOutlineHighlight className={hightlight ? 'bg-sky-700 p-1 w-9 h-9 rounded' : 'bg-zinc-50 p-1 w-9 h-9 rounded'} onClick={() => callHighlight()} />
                <MdOutlineDescription className={'bg-zinc-50 p-1 w-9 h-9 rounded ml-2'} />
            </div>
            <div className="review-block w-11/12 block ml-auto mr-auto my-5 h-min bg-gradient-to-r p-5 rounded-2xl from-sky-500 to-indigo-500 mb-2" id='reviewBlock'
                style={{ 'height': '70vh', 'overflowY': 'scroll' }}>
                <p className="text-zinc-50 font-bold text-base mb-2">Take a look at Lebron's review on the items</p>
                <div className="w-full p-2 row block justify-between items-center">
                    {
                        data.slice(0, (review * 10)).map((review, index) => {
                            return (
                                <div className={(hightlight && review.overall > 3) === true ? 'border-red-700 border-2 review-box bg-white rounded-xl p-1 py-2 px-2 mb-1 mr-3 h-min overflow-y-hidden' :
                                    'review-box bg-white rounded-xl p-1 py-2 px-2 mb-1 mr-3 h-min overflow-y-hidden'} >
                                    <div className="flex justify-between" key={review.asin + index + review.overall}>
                                        <p className="text-base flex items-center text-blue-600 truncate ...">
                                            <span className='bg-sky-600 p-1 rounded'><FiUser /></span>
                                            &nbsp; {review.reviewerName}</p>
                                        <p className='flex items-center'>{reviewStars(review.overall)}
                                        </p>
                                    </div>
                                    <p className={(hightlight && review.overall > 3) === true ? " underline decoration-pink-500 decoration-4 mt-1 subpixel-antialiased font-mono text-base font-bold" :
                                        "mt-1 subpixel-antialiased font-mono text-base font-bold"}>{review.summary}</p>
                                    <p className={(hightlight && review.overall > 3) === true ? "underline decoration-pink-300 text-sm mt-1 font-sans" : "text-sm mt-1 font-sans"}>{review.reviewText}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Services;