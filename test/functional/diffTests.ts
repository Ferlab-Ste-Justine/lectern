import { expect } from 'chai';
import { DictionaryDocument } from '../../src/models/Dictionary';
import { diff, getFieldMap } from '../../src/diff/DictionaryDiff';

describe('Compute diff report between dictionary versions', () => {
  const dict1 = require('./fixtures/dict1.json') as DictionaryDocument;
  const dict2 = require('./fixtures/dict2.json') as DictionaryDocument;

  it('Should compute the field map correctly', () => {
    const mockDocument = {
      name: 'foo',
      schemas: [
        {
          name: 'bar',
          fields: [
            {
              name: 'baz',
            },
            {
              name: 'qux',
            },
          ],
        },
      ],
    };

    const fieldMap = getFieldMap(mockDocument as DictionaryDocument);
    expect(fieldMap.size).to.be.equal(2);
    expect(fieldMap.get('bar.baz')).to.be.not.undefined;
  });

  it('Should compute the diff, with one file added (3 fields), and 3 updated on existing file', () => {
    const diffReport = diff(dict1, dict2);
    expect(diffReport).is.not.undefined;
    expect(diffReport.get('donor.donor_submitter_id')).to.not.be.undefined;
    expect(diffReport.get('donor.donor_submitter_id').diff).to.deep.eq({
      displayName: {
        type: 'deleted',
        data: 'Submitter Donor ID',
      },
      restrictions: {
        script: {
          type: 'updated',
          data: 'THIS WAS UPDATED',
        },
      },
    });

    expect(diffReport.get('donor.gender').diff).to.deep.eq({
      restrictions: {
        codeList: {
          type: 'updated',
          data: {
            added: ['Undeclared'],
            deleted: ['Other'],
          },
        },
      },
    });

    expect(diffReport.get('donor.vital_status').diff).to.deep.eq({
      displayName: {
        type: 'updated',
        data: 'Donor Vital Status',
      },
      restrictions: {
        codeList: {
          type: 'deleted',
          data: ['Alive', 'Deceased', 'Other'],
        },
      },
    });

    expect(diffReport.size).to.be.equal(8);
  });
});
