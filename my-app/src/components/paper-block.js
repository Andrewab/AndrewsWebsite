import Script from "next/script";
import philPageStyles from '@/styles/philosophyPapersStyles.module.css';
import useSWR from 'swr';
import { useEffect, useState } from 'react';



function PaperBlock () {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('./data.txt');
                const data = await response.json();
                setData(data);
                setLoading(false);
            }
                catch(error) {
                    setError(error);
                    setLoading(false);
                }
            }
            fetchData();
        }, []);
        if(loading) {
            return <div>Loading..</div>
        }
        if(error) {
            return <div>Error: {error.message}</div>
        }
        return (
        <div className={philPageStyles.paperWrapper}>
        {data.map(item => (
            <div className={philPageStyles.paperBlock}>{item.title}<br></br><br></br>{item.body}</div>
        ))}
        </div>
        );
}

export default PaperBlock