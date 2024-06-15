import { describe, expect, it } from "vitest";

import React from "react";
import Spinner from '../../src/components/ui/Spinner';
import renderer from 'react-test-renderer';

describe("Spinner UI Component", () => {
  it('Snapshot should match', () => {
    const component = renderer.create(<Spinner/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
