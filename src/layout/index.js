import { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap"
import homeIcon from '../assets/images/home-icon.png'
import stackIcon from '../assets/images/stack-icon.png'
import moonIcon from '../assets/images/moon-icon.png'
import sunIcon from '../assets/images/sun-icon.png'
import sunlightIcon from '../assets/images/sunlight.png'
import homeWhite from '../assets/images/homeWhite.png'
import stackWhite from '../assets/images/stackWhite.png'
import moonWhiteIcon from '../assets/images/moonwhite-iconn.png'
import Checkbox from "./Checkbox";
import Catalogues from "../files.json";
import useLocalStorage from 'use-local-storage'

const Layout = () => {

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    
    const [open, setOpen] = useState('2');
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    useEffect(() => {
        setList(Catalogues);
    }, [list]);
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };
    const catalog = list.map((data, i) => {
        const name = data.path.split('/')[3]
        const size = data.size
        return (
            <div>
                <Checkbox
                    key={i}
                    type="checkbox"
                    name={name}
                    id={data.id}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(data.id)}
                />
                {name + " " + '(' + size + ')'}
            </div>
        );
    });
    return (
        <div className="d-flex main-page" data-theme={theme}>
            <div className="sidebar">
                <ul>
                    {theme === 'light' ? <>
                    <li onClick={() => toggle(0)} className="icon"><img src={homeIcon} alt="home" /></li>
                    <li onClick={() => toggle('2')}><img src={stackIcon} alt="stack" /></li>
                    </>
                :
                <>
                <li onClick={() => toggle(0)}><img src={homeWhite} alt="home" /></li>
                <li onClick={() => toggle('2')} className="icon"><img src={stackWhite} alt="stack" /></li>
                </>
                }
                </ul>
                <ul>
                    {theme === 'light' ?
                        <>
                            <li onClick={() => { setTheme('light') }} className="icon"><img src={sunlightIcon} alt="sun" /></li>
                            <li onClick={() => { setTheme('dark') }}><img src={moonIcon} alt="moon" /></li>
                        </>
                        :
                        <>
                            <li onClick={() => { setTheme('light') }}><img src={sunIcon} alt="sun" /></li>
                            <li onClick={() => { setTheme('dark') }} className="icon"><img src={moonWhiteIcon} alt="moon" /></li>
                        </>
                    }
                </ul>
            </div>
            <div className="home">
                <Accordion open={open} toggle={toggle}>
                    <AccordionItem>
                        <AccordionHeader targetId="1">SPACE DATA</AccordionHeader>
                        <AccordionBody accordionId="1">
                            <strong>This is the first item&#39;s accordion body.</strong>
                            You can modify any of this with custom CSS or overriding our default
                            variables. It&#39;s also worth noting that just about any HTML can
                            go within the <code>.accordion-body</code>, though the transition
                            does limit overflow.
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">Time</AccordionHeader>
                        <AccordionBody accordionId="2">

                            <Accordion open={open} toggle={toggle}>
                                <AccordionItem>
                                    <AccordionHeader targetId="2">202215</AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <div className="data-item">
                                            <Checkbox
                                                type="checkbox"
                                                name="selectAll"
                                                id="selectAll"
                                                handleClick={handleSelectAll}
                                                isChecked={isCheckAll}
                                            />
                                            Select All
                                            <div>
                                                {catalog}
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        </AccordionBody>

                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default Layout