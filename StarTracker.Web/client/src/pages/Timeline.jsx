import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PageContainer} from '../components/Container/PageContainer';
import {Heading} from '../components/Heading/Heading';
import {MotivationalQuote} from '../components/MotivationalQuote/MotivationalQuote';
import {Activities} from '../components/Activities/Activities';
import {MostActiveUsers} from '../components/MostActiveUsers/MostActiveUsers';
import {MotivationalQuoteScores} from '../components/MotivationalQuote/MotivationalQuoteScores';
import {getTimelineHeadingMotivationalQuote, getTimelineScoreMotivationalQuote} from '../redux/motivational-quotes/actions';

export const Timeline = () => {
	const dispatch = useDispatch();

	const mQuoteHeading = useSelector(state => state.motivationalQuotes.timelineHeadingMotivationalQuote);
	const mQuoteScore = useSelector(state => state.motivationalQuotes.timelineScoreMotivationalQuote);
	const heading = {
		h1: 'Star Tracker ',
		h2: 'Timeline',
		p: 'Check your colleagues’ progress'
	};

	useEffect(() => {
		!mQuoteHeading && dispatch(getTimelineHeadingMotivationalQuote());
		!mQuoteScore && dispatch(getTimelineScoreMotivationalQuote());
	}, [mQuoteHeading, mQuoteScore, dispatch]);

	return (
		<PageContainer>
			<div className="row no-gutters justify-content-between">
				<div className="content-with-sidebar">
					<MotivationalQuote mQuote= {mQuoteHeading} class= {'timeline'}/>
					<Heading heading= {heading} class= {'single-line'} />
					<Activities class={'timeline__activities'} />
				</div>
				<div className="content-sidebar">
					<MostActiveUsers />
					<MotivationalQuoteScores mQuote= {mQuoteScore} />
				</div>
			</div>
		</PageContainer>
	);
};