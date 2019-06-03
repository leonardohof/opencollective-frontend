import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Flex, Box } from '@rebass/grid';

import { H3, Span } from '../Text';
import HTMLEditor from '../HTMLEditor';
import HTMLContent, { isEmptyValue } from '../HTMLContent';
import InlineEditField from '../InlineEditField';
import Container from '../Container';
import StyledButton from '../StyledButton';

/**
 * Display the inline editable description section for the collective
 */
const SectionAbout = ({ collective, canEdit, editMutation }) => {
  const isEmptyDescription = isEmptyValue(collective.longDescription);

  return (
    <Flex flexDirection="column" alignItems="center" px={2} py={5}>
      <H3 fontSize="H2" fontWeight="normal" mb={5}>
        <FormattedMessage id="SectionAbout.Title" defaultMessage="Why we do what we do" />
      </H3>

      <Container width="100%" maxWidth={700} margin="0 auto">
        <InlineEditField
          mutation={editMutation}
          values={collective}
          field="longDescription"
          canEdit={canEdit}
          showEditIcon={!isEmptyDescription}
        >
          {({ isEditing, value, setValue, enableEditor }) => {
            if (isEditing) {
              return (
                <HTMLEditor defaultValue={value} onChange={setValue} allowedHeaders={[false, 2, 3]} /** Disable H1 */ />
              );
            } else if (isEmptyDescription) {
              return (
                <Flex justifyContent="center">
                  {canEdit ? (
                    <Box margin="0 auto">
                      <StyledButton buttonSize="large" onClick={enableEditor}>
                        <FormattedMessage id="CollectivePage.AddLongDescription" defaultMessage="Add your mission" />
                      </StyledButton>
                    </Box>
                  ) : (
                    <Span color="black.500" fontStyle="italic">
                      <FormattedMessage
                        id="SectionAbout.MissingDescription"
                        defaultMessage="{collectiveName} didn't write a presentation yet"
                        values={{ collectiveName: collective.name }}
                      />
                    </Span>
                  )}
                </Flex>
              );
            } else {
              return <HTMLContent content={collective.longDescription} data-cy="longDescription" />;
            }
          }}
        </InlineEditField>
      </Container>
    </Flex>
  );
};

SectionAbout.propTypes = {
  /** The collective to display description for */
  collective: PropTypes.shape({
    id: PropTypes.number.isRequired,
    longDescription: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  /** A mutation used to update the description */
  editMutation: PropTypes.object,
  /** Can user edit the description? */
  canEdit: PropTypes.bool,
};

export default SectionAbout;
