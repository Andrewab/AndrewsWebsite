import Script from "next/script";
import philPageStyles from '@/styles/philosophyPapersStyles.module.css';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Link from 'next/link';


function PaperBlock () {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('./philosophyPapers.txt');
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch(error) {
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
            {data.map((item, index) => (
                <div key={index} className={philPageStyles.paperBlock}>
                    <Link className={philPageStyles.paperLink} href={item.link}>
                        {item.title}
                    </Link>
                    <br></br><br></br>
                    {item.body}
                </div>
            ))}
        </div>
    );
}

export default PaperBlock;
