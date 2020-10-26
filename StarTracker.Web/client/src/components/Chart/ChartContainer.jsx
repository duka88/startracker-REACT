import React from 'react';
import moment from 'moment';
import {ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const transferDataToChartData = (data) =>
	data.map(e => {
		return {
			name: moment(e.Date).format('MMM'),
			'MVP': e.MvpScore,
			'People skills': e.PeopleSkillsScore,
			'Technical skills': e.TechnicalSkillsScore,
		};
	});

const LinearGradient = (gradientId, color) =>
	<linearGradient id={`${gradientId}Color`} x1="0" y1="0" x2="0" y2="1">
		<stop offset="5%" stopColor={color} stopOpacity={0.6}/>
		<stop offset="95%" stopColor={color} stopOpacity={0}/>
	</linearGradient>;

const SkillLine = (key, color, gradientId) =>
	<Area
		dataKey={key}
		stroke={color}
		fillOpacity={1}
		fill={`url(#${gradientId}Color)`}
		dot={{strokeWidth: 2, fill: color}}
		strokeWidth={2.3}
	/>;

export const ChartContainer = (props) => {
	return <div style={{width: '100%', height: 364}}>
		<ResponsiveContainer>
			<ComposedChart height={364} data={transferDataToChartData(props.data)} margin={{left: 0, bottom: 0, right: 10}}>
				<defs>
					{LinearGradient('TechnicalSkills', '#f6c320')}
					{LinearGradient('MVP', '#f07e7e')}
					{LinearGradient('PeopleSkills', '#7cc8c1')}
				</defs>
				<XAxis dataKey="name" stroke="#bababa" axisLine={false} tickLine={false} />
				<YAxis width={30} stroke="#bababa" axisLine={false} tickLine={false} />
				<CartesianGrid stroke="#bababa" strokeDasharray="10 10" vertical={false} />
				<Tooltip/>
				<Legend wrapperStyle={{top: -48}} />
				{SkillLine('Technical skills', '#f6c320', 'TechnicalSkills')}
				{SkillLine('MVP', '#f07e7e', 'MVP')}
				{SkillLine('People skills', '#7cc8c1', 'PeopleSkills')}
			</ComposedChart>
		</ResponsiveContainer>
	</div>;
};