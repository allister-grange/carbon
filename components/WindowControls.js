import React from 'react'
import { useCopyTextHandler } from 'actionsack'

import { COLORS } from '../lib/constants'
import { Controls, ControlsBW, ControlsBoxy } from './svg/Controls'
import CopySVG from './svg/Copy'
import CheckMark from './svg/Checkmark'

const size = 24

const CopyButton = React.memo(function CopyButton({ text }) {
  const { onClick, copied } = useCopyTextHandler(text)

  return (
    <button onClick={onClick} aria-label="Copy Button">
      {copied ? (
        <CheckMark color={COLORS.GRAY} width={size} height={size} />
      ) : (
        <CopySVG size={size} color={COLORS.GRAY} />
      )}
      <style jsx>
        {`
          button {
            border: none;
            cursor: pointer;
            color: ${COLORS.SECONDARY};
            background: transparent;
          }

          &:active {
            outline: none;
          }
        `}
      </style>
    </button>
  )
})

const WINDOW_THEMES_MAP = { bw: <ControlsBW />, boxy: <ControlsBoxy /> }

export function TitleBar({ light, value, onChange }) {
  return (
    <div>
      <input
        aria-label="Image title"
        type="text"
        spellCheck="false"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
      <style jsx>
        {`
          div {
            position: absolute;
            margin: 0px;
            top: -3px;
            left: -9px;
            width: 100%;
            text-align: center;
          }

          input {
            width: 250px;
            background: none;
            outline: none;
            border: none;
            text-align: center;
            /**
             * 140px is an arbitrary value, but it's roughly equal to:
             * 2 * (window theme width + window theme outside margin)
             */
            max-width: calc(100% - 140px);
            font-size: 14px;
            color: ${light ? COLORS.BLACK : COLORS.SECONDARY};
          }
        `}
      </style>
    </div>
  )
}

export default function WindowControls({
  theme,
  copyable,
  code,
  light,
  titleBar,
  onTitleBarChange,
  displayingCodeLanguage,
  codeLanguage,
  fontFamily,
}) {
  return (
    <div className="window-controls">
      {WINDOW_THEMES_MAP[theme] || <Controls />}
      {displayingCodeLanguage && <span className="code-title">{codeLanguage}</span>}
      <TitleBar value={titleBar} onChange={onTitleBarChange} light={light} />
      {copyable && (
        <div className="copy-button">
          <CopyButton text={code} />
        </div>
      )}
      <style jsx>
        {`
          .window-controls {
            margin-top: -24px;
            position: relative;
            top: ${theme === 'bw' ? 36 : 34}px;
            margin-left: ${theme === 'bw' ? 16 : 14}px;
            margin-right: ${theme === 'boxy' ? 16 : 0}px;
            z-index: 2;
            text-align: ${theme === 'boxy' ? 'right' : 'initial'};
          }

          .copy-button {
            cursor: pointer;
            position: absolute;
            top: 0px;
            right: 16px;
          }

          .code-title {
            font-size: 14px;
            margin-left: 24px;
            font-family: ${fontFamily};
            position: absolute;
            top: 2px;
          }
        `}
      </style>
    </div>
  )
}
