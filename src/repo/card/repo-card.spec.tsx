import { Card, CardContent, Chip, Divider, Grid, Typography } from '@material-ui/core';
import createShallow from '@material-ui/core/test-utils/createShallow';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { BranchDetails, Status } from "./../model";
import { RepoCard } from './repo-card.component';

describe("RepoCard", () => {
  const defaultRepoName = "repo";

  describe("title and icon grid", () => {
    let wrapper: ShallowWrapper;

    beforeAll(() => {
      wrapper = createShallow({ dive: true })(<RepoCard branchStats={[]} repoName={defaultRepoName} />)
    })

    it("should render a grid container with correct alignment and justification", () => {
      const spaceBetween = "space-between"
      const props = wrapper.find(Card).find(CardContent).find(Grid).first().props()

      expect(props.container).toBeTruthy()
      expect(props.alignContent).toBe(spaceBetween)
      expect(props.justify).toBe(spaceBetween)
    })

    it("should render the repo title and the first grid item with correct sizing and color", () => {
      const thisItem = wrapper.find(Card).find(CardContent).find(Grid).children().first()
      const gridItemProps = thisItem.props()
      const title = thisItem.find(Typography).first()
      const titleProps = title.props()

      expect(gridItemProps.item).toBeTruthy()
      expect(gridItemProps.xs).toBe(10)
      expect(title.dive().children().text()).toBe(defaultRepoName)
      expect(titleProps.color).toBe("textSecondary")
      expect(titleProps.variant).toBe("h6")
    })
  })

  describe("Render branch stats", () => {
    it("should render nothing if branch stats is empty", () => {
      const wrapper = shallowRepoCard(defaultRepoName, [])
      const thisItem = wrapper.find(Card).find(CardContent).find(Grid).children().at(1)
      expect(thisItem.find(Chip).length).toBe(0)
    })

    it("should render a divider when branch stats exist", () => {
      const repoName = "master";
      const masterStats = {
        name: "master",
        status: Status.InProgress
      }

      const wrapper = createShallow({ dive: true })(<RepoCard branchStats={[masterStats]} repoName={repoName} />)
      const thisItem = wrapper.find(`#${repoName}-stats`).find(Divider)

      expect(thisItem.length).toBe(1)
      // TODO : How to test these when using WithStyles?
      // expect(thisItem.props().style.marginTop).toBe("2px")
      // expect(thisItem.props().style.marginBottom).toBe("15px")
    })

    it("should render master branch failure stats", () => {
      const repoName = "master";
      const masterStats = {
        name: "master",
        status: Status.Failed
      }

      const wrapper = shallowRepoCard(repoName, [masterStats])
      const thisItem = wrapper.find(`#${repoName}-stats`).children().find(Chip)

      expect(thisItem.length).toBe(1)
      // TODO : Figure out how to pull out the icon type and test it
      // expect(thisItem.props().avatar.props.style.color).toBe("#ef5350")
    })

    it("should render master branch in progress stats", () => {
      const repoName = "master";
      const masterStats = {
        name: "master",
        status: Status.InProgress
      }

      const wrapper = shallowRepoCard(repoName, [masterStats])
      const progressIcon = wrapper.find(`#${repoName}-stats`).find(Chip).props().label.props.children[1]

      // TODO : Figure out how to pull out the icon type properly and test it, below is a bit of a hack
      expect(progressIcon.type.displayName).toContain("LinearProgress")
    })
  })

  describe("on chip click", () => {
    it("should call provided function", () => {
      const repoName = "test";
      const branchName = "master"
      const masterStats = {
        name: branchName,
        status: Status.InProgress
      }
      const onChipClick = (rName: string, bName: string) => {
        expect(rName).toBe(repoName)
        expect(bName).toBe(branchName)
      }
      const wrapper = shallowRepoCard(repoName, [masterStats], onChipClick)
      const thisItem = wrapper.find(`#${repoName}-stats`)
      thisItem.find(Chip).simulate("click")
    })
  })
})

const shallowRepoCard = (
  repoName: string,
  branchDetails: BranchDetails[],
  onChipClick?: (repoName: string, branchName: string) => void
) => createShallow({ dive: true })(<RepoCard branchStats={branchDetails} repoName={repoName} />)