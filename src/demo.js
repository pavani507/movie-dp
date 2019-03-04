import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { API_KEY } from "./keys";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class MovieDB extends React.Component {
  state = {
    value: 0,
    data: []
  };

  handleChange = (event, value) => {
    this.setState({ value }, this.fetchData);
  };

  fetchData = () => {
    const { value } = this.state;
    const apiQuery = value === 0 ? "popular" : "top_rated";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${apiQuery}?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(res => {
        this.mounted = true;
        const data = res.data.results;
        if (this.mounted) {
          console.log(data);
          this.setState({ data });
        }
      });
  };

  nextPath = path => {
    this.props.history.push(path);
  };
  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { classes } = this.props;
    const { data, value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs fullWidth value={value} onChange={this.handleChange}>
            <Tab label="POPULAR" />
            <Tab label="TOP" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <List>
              {data.map(popular => (
                <ListItem
                  key={popular.id}
                  dense
                  button
                  onClick={() => this.nextPath(`/movie/${popular.id}`)}
                >
                  <ListItemText primary={` ${popular.title}`} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <List>
              {data.map(top => (
                <ListItem
                  dense
                  button
                  key={top.id}
                  onClick={() => this.nextPath(`/movie/${top.id}`)}
                >
                  <ListItemText primary={` ${top.title}`} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        )}
      </div>
    );
  }
}

MovieDB.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MovieDB));
