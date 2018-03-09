import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup
} from "material-ui/Form";
import Switch from "material-ui/Switch";
import store from "store";
import connect from "hoc/connect";

class TaskList extends React.Component {
  state = {
    toggleAll: false
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.object.isRequired
  };

  handleToggleAll = (event, checked) => {
    this.setState({
      [event.target.value]: checked
    });
    Object.keys(this.props.tasks).forEach(task =>
      this.handleTaskCheck(task)(event, checked)
    );
  };

  handleTaskCheck = name => (event, checked) => {
    store.config.tasks[name] = checked;
  };

  render() {
    const { title, tasks, config } = this.props;
    const { toggleAll } = this.state;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={toggleAll}
                onChange={this.handleToggleAll}
                value="toggleAll"
              />
            }
            label="Toggle All"
          />
          {Object.keys(tasks).map(task => (
            <FormControlLabel
              key={task}
              control={
                <Switch
                  checked={config.tasks[task]}
                  onChange={this.handleTaskCheck(task)}
                  value={task}
                />
              }
              label={tasks[task]}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }
}

export default connect(TaskList);
