import { Grid } from '@material-ui/core';
import createShallow from '@material-ui/core/test-utils/createShallow';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Repository, Status } from './model';
import { RepoGrid } from './repo-grid.component';

describe("Repo layout grid", () => {
  interface GridProps {
    container: boolean,
    spacing: number,
    xs: number,
    sm: number,
    md: number,
    lg: number
  }

  const masterStats = {
    name: "master",
    status: Status.InProgress
  }
  const repo: Repository = {
    branches: [masterStats],
    name: "test-repo"
  }

  describe("Grid container", () => {
    let gridContainer: ShallowWrapper<GridProps, any>;

    beforeAll(() => {
      gridContainer = createShallow({ dive: true })(<RepoGrid repositories={[repo]} />).find(Grid).first()
    })

    it("should have be a container", () => {
      expect(gridContainer.props().container).toBeTruthy()
    })

    it("should have correct spacing", () => {
      expect(gridContainer.props().spacing).toBe(8)
    })
  })

  describe("Grid item sizing", () => {
    let gridItem: ShallowWrapper<GridProps, any>;

    beforeAll(() => {
      gridItem = createShallow({ dive: true })(<RepoGrid repositories={[repo]} />).find(Grid).first().childAt(0)
    })

    it("should have correct sizing for each screen size", () => {
      expect(gridItem.props().xs).toBe(12)
      expect(gridItem.props().sm).toBe(12)
      expect(gridItem.props().md).toBe(6)
      expect(gridItem.props().lg).toBe(4)
    })
  })

  describe("Render repositories", () => {
    it("when no repositories found, renders the string 'Empty...'", () => {
      const gridItem = createShallow({ dive: true })(<RepoGrid />).find("div")
      expect(gridItem.text()).toBe("Empty")
    })
  })
})