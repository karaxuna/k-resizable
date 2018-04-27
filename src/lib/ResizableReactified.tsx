import * as React from 'react';
import ResizableTable from './Resizable';

class ResizableReactified extends React.Component<any> {
    table: HTMLTableElement;
    plugin: ResizableTable;

    static defaultProps = {
        innerRef: () => {}
    };

    shouldComponentUpdate() {
        if (this.plugin.resizing) {
            return false;
        }

        return true;
    }

    componentDidMount() {
        this.plugin = new ResizableTable(this.table);
    }

    componentWillUnmount() {
        this.plugin.destroy();
    }

    componentDidUpdate() {
        this.plugin.updateMatrix();
    }

    handleRef = (table) => {
        this.table = table;
        this.props.innerRef(table);
    }

    render() {
        let {
            children,
            innerRef,
            ...props
        } = this.props;
        
        return (
            <table {...props} ref={this.handleRef}>
                {children}
            </table>
        );
    }
}

export default ResizableReactified;
