import React from 'react';
import '../styles/VerticalScoreBar.css';

interface VerticalScoreBarProps {
    score: number; // сurrent result
    maxScore: number; // max result
}

const VerticalScoreBar: React.FC<VerticalScoreBarProps> = ({ score, maxScore }) => {
    // couting a percent of filling
    const fillHeight = (score / maxScore) * 100;

    return (
        <div className="score-bar-container">
            <div className="score-bar">
                <div
                    className="score-bar-fill"
                    style={{ height: `${fillHeight}%` }}
                ></div>
            </div>
            {/*<div className="score-label">{score} / {maxScore}</div>*/}
        </div>
    );
};

export default VerticalScoreBar;
