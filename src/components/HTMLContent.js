import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * React-Quill usually saves something like `<p><br/></p` when saving with an empty
 * editor. This function tries to detect this and returns true if there's no real
 * text, image or iframe contents.
 */
export const isEmptyValue = value => {
  if (!value) {
    return true;
  } else if (value.length > 50) {
    // Running the regex on long strings can be costly, and there's very few chances
    // to have a blank content with tons of empty markup.
    return false;
  } else if (/(<img)|(<iframe)|(<video)/.test(value)) {
    // If the content has no text but has an image or an iframe (video) then it's not blank
    return false;
  } else {
    // Strip all tags and check if there's something left
    const cleanStr = value.replace(/(<([^>]+)>)/gi, '');
    return cleanStr.length === 0;
  }
};

/**
 * `HTMLEditor`'s associate, this component will display raw HTML with some CSS
 * resets to ensure we don't mess with the styles.
 *
 * ⚠️ Be careful! This component will pass content to `dangerouslySetInnerHTML` so
 * always ensure `content` is properly sanitized!
 */
const HTMLContent = styled(({ content, ...props }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} {...props} />;
})`
  /** Override global styles to match what we have in the editor */
  h1,
  h2,
  h3 {
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-left {
    text-align: left;
  }

  ul li {
    list-style: none;
    position: relative;
    padding: 0 0 0 2em;
    margin-bottom: 0.5em;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.4em;
      width: 0.625em;
      height: 0.625em;
      border-radius: 50%;
      border: 0.1em solid #1f87ff;
    }
  }
`;

HTMLContent.propTypes = {
  /** The HTML string. Makes sure this is sanitized properly! */
  content: PropTypes.string,
};

export default HTMLContent;
