import React from 'react';
import { Transition } from 'react-transition-group';
import { Container } from '../../Container/Container';
import { Chart } from "react-google-charts";
import { Loader } from '../../Loader/Loader';
import { Heading } from '../../Heading/Heading';
import { Stats } from '../Income/Stats';


// Milestone: add ability to change some aspect of the debt within the panel
type Props = {
    data: {
        name: string,
        principal: number,
        debtType: string,
        rate: number,
        numberOfPayments: number,
        interestsOverTime: number[],
        principalOverTime: number[],
        totalInterestPaid: number
    },
    state: [{
        show: boolean;
        index: number;
    }, React.Dispatch<React.SetStateAction<{
        show: boolean;
        index: number;
    }>>]
}

export const DebtSidePanel = ({ data, state }: Props) => {

    const elRef = React.createRef<HTMLElement>();
    
    const duration = 300;

    const defaultStyleBackground = {
        transform: "translateX(100%)",
        opacity: 0,
        transition: `opacity ${duration}ms linear`
    };

    const defaultStyleInner = {
        transform: "translateX(100%)",
        opacity: 0,
        transition: `all ${duration}ms linear`,
    }

    const transitionStylesBackground: {[key: string]: any} = {
        entering: {
            transform: "translateX(0)",
            opacity: 1
        },
        entered: {
            transform: "translateX(0)",
            opacity: 1
        },
        exiting: {
            transform: "translateX(100%)",
            opacity: 0
        },
        exited: {
            transform: "translateX(100%)",
            opacity: 0
        },
      };

    const [show, setShow] = state;
    const [panel, setPanel] = React.useState(false);
    const [chartSize, setChartSize] = React.useState({
        width: 300,
        height: 300
    });
    const [chartData, setChartData] = React.useState();

    const getChartSize = (elRef: React.RefObject<HTMLElement>) => {
        if (elRef.current) {
            const width = elRef.current.getBoundingClientRect().width;
            const height = elRef.current.getBoundingClientRect().height;
            setChartSize(prev => Object.assign({}, prev, { width, height }));
        }
    }

    const getDataArray = () => {
        const chartDataArray: any = [
            ["x", "Principal"]
        ];
        for (let index = 0; index < data.interestsOverTime.length; index++) {
            chartDataArray.push([index, data.principalOverTime[index]]);
        }

        setChartData(chartDataArray);
    }
    
    
    React.useEffect(() => setPanel(show.show), [show]);
    React.useEffect(() => {
        getChartSize(elRef);
        getDataArray();
    }, []);

    return (
        <Transition in={panel} timeout={duration}>
            {state => (
                <section
                    className="side-panel"
                    style={{
                        ...defaultStyleBackground,
                        ...transitionStylesBackground[state]
                    }}>
                    <aside
                        className="inner-panel"
                        style={{
                            ...defaultStyleInner,
                            ...transitionStylesBackground[state]
                        }}
                    >
                        <div onClick={() => setShow(previous => (Object.assign({}, previous, { show: !show.show })))} className="close">&times;</div>
                        <Container fluid>
                            <Container>
                                <Heading as="h3">{data.name}</Heading>
                            </Container>
                            <Container ref={elRef}>
                                <Chart
                                    width={chartSize.width}
                                    height={chartSize.height}
                                    chartType="LineChart"
                                    loader={<Loader />}
                                    data={chartData}
                                    options={{
                                        hAxis: {
                                            title: "Payments"
                                        },
                                        vAxis: {
                                            title: "Principal"
                                        }  
                                    }}
                                />
                                <Container classname="stats-container">
                                    <Stats i={0} tax={data.totalInterestPaid} title="Interests paid" />
                                    <Stats i={0} tax={data.totalInterestPaid + data.principal} title="Total" />
                                    <Stats i={0} tax={(data.principalOverTime.length / 12)} title="Time to pay" unit=" years" />
                                </Container>
                            </Container>
                        </Container>
                    </aside>
                </section>
            )}
        </Transition>
    );
}
