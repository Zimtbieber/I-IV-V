import React, { useState, useEffect } from 'react';
import styles from './ChordsInKey.module.css';
import { NotePicker } from '../Multipurpose/';
import { getHeptatonicScaleNames, getScaleAndCommonProg } from '../../logic/';
import { CardWrapper, ResultingChords } from '../Multipurpose/';

export default function ChordsInKey({ lang }) {

    const ddElements = getHeptatonicScaleNames();
    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('Major');
    const [chordsAndProgressions, setChordsAndProgressions] = useState(
        getScaleAndCommonProg(selectedVoicing, selectedNote));

    useEffect(() => {
        document.title = `${lang.str.ivv} - ${lang.str.music_theory} - ${lang.str.chords_in_key}`;
    }, [lang]);

    useEffect(() => {
        setChordsAndProgressions(getScaleAndCommonProg(selectedVoicing, selectedNote));
    }, [selectedNote, selectedVoicing]);

    const styleSelectVoicing = () => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: '1rem',
        }
    }
    
    const styleSelectedVoicing = (voicing) => {
        if (selectedVoicing === voicing) {
            return {
                border: 'var(--accent-color) solid 6px',
                opacity: '1'
            }
        }
    }

    const styleChordVoicing = (chordVoicing) => {
        if (chordVoicing.includes('°')) {
            return { border: 'var(--dim-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toUpperCase()) {
            return { border: 'var(--major-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toLowerCase()) {
            return { border: 'var(--minor-color) solid 3px' };
        }
    }

    return (
        <div className={styles.chordsInKey}>

            <CardWrapper label={lang.str.sel_key}>
                <NotePicker
                    onClick={(note) => setSelectedNote(note)} />
            </CardWrapper>
        
            <CardWrapper label={lang.str.sel_voicing} style={styleSelectVoicing()}>
                {ddElements.map((name, index) => (
                    <button
                        className="btn"
                        style={styleSelectedVoicing(name)}
                        key={index}
                        onClick={() => setSelectedVoicing(name)}>
                        {name}
                    </button>
                ))}
            </CardWrapper>

            <CardWrapper label={lang.str.res_chords}>
                <ResultingChords chordsAndProgressions={chordsAndProgressions}/>
            </CardWrapper>

            <CardWrapper label={lang.str.comm_progr}>
                {chordsAndProgressions.progressions.map((num, index) => (
                    <Progression
                        progression={num}
                        chords={chordsAndProgressions.chords}
                        scale={chordsAndProgressions.scale}
                        key={index}
                        style={styleChordVoicing} />
                ))}
            </CardWrapper>
        </div>
    );
}

function Progression({ progression, chords, scale, style }) {
    return (
        <div className={styles.progression}>
            <div className={styles.progressionNum}>
                {progression.map((prog, index) => (
                    <div className={styles.chordNumber}
                        key={index}>
                        {chords[prog - 1]}
                    </div>
                ))}:
            </div>
            <div className={styles.progressionChords}>
                {progression.map((prog, index) => (
                    <div className={styles.chordNote}
                        key={index}
                        style={style(chords[prog - 1])}>
                        {scale.notes[prog - 1]}
                    </div>
                ))}
            </div>
        </div>
    );
}