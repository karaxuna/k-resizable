import * as React from 'react';
import ResizableTable from '../lib/ResizableReactified';
import Resizable from '../lib/Resizable';

class ResizableTableDemo extends React.Component <any, any> {
    box;

    componentDidMount() {
        new Resizable(this.box);
    }

    render() {
        return (
            <div className="kmp__NoteEditor">
                <div id="box" ref={box => this.box = box} style={{ border: 'solid 5px green', width: 200, height: 200, backgroundColor: 'brown' }}>

                </div>

                <div className="kmp__NoteEditorToolbar">
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div>Normal text</div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div>
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div>Font size</div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div><div className="NoteEditorToolbarSeparator"/>
                    <div
                        className="NoteEditorToolbarToggleInlineStyleButton NoteEditorToolbarButton"><i className="fa fa-bold"/></div>
                    <div
                        className="NoteEditorToolbarToggleInlineStyleButton NoteEditorToolbarButton"><i className="fa fa-italic"/></div>
                    <div
                        className="NoteEditorToolbarToggleInlineStyleButton NoteEditorToolbarButton"><i className="fa fa-underline"/></div>
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div>
                            <div>
                                <div>&nbsp;A&nbsp;</div><div
                                    style={{
                height: 2,
                backgroundColor: 'red'
            }}/></div>
                        </div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-indent"/></div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-indent left-indent-button"/></div>
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div>Style</div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div><div className="NoteEditorToolbarSeparator"/>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-align-left"/></div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-align-center"/></div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-align-right"/></div>
                    <div className="NoteEditorToolbarToggleBlockTypeButton NoteEditorToolbarButton"><i className="fa fa-align-justify"/></div><div className="NoteEditorToolbarSeparator"/>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-list-ul"/></div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-list-ol"/></div><div className="NoteEditorToolbarSeparator"/>
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div><i className="fa fa-table"/></div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div>
                    <div className="NoteEditorToolbarSelectButtonTarget NoteEditorToolbarButton">
                        <div>
                            <div>
                                <div><span className="fa fa-paint-brush"/></div><div
                                    style={{
                height: 2,
                marginTop: 2
            }}/></div>
                        </div>
                        <div><i className="fa fa-caret-down"/></div>
                    </div>
                    <div className="NoteEditorToolbarButton"><i className="fa fa-check-square"/></div>
                </div>
                <div
                    className="react-contextmenu-wrapper kmp__NoteEditor__ContextMenuEditorWrapper">
                    <div
                        className="kmp__NoteEditor__Editor"
                        spellCheck
                        role="textbox"
                        style={{
                        outline: 'none',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        WebkitUserModify: 'read-write-plaintext-only'
                    }}>
                        <h4 data-key={2}>
                            <span data-key={3}>
                                <span data-offset-key="3:0">დანიშნული გამოკვლევები:</span>
                            </span>
                        </h4>
                        <div data-key={4}>
                            <span data-key={5}>
                                <span data-offset-key="5:0"></span>
                            </span>
                        </div>
                        <ResizableTable
                            data-key="0.3945145166183148"
                            style={{
                            width: '100%',
                            borderSpacing: 0,
                            borderCollapse: 'collapse',
                            cursor: 'default',
                            userSelect: 'none'
                        }}>
                            <tbody data-key="0.14256315378848616">
                                <tr data-key={19}>
                                    <td
                                        data-key={20}
                                        className="NoteEditor__TableCellBlock--selected NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: 179,
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={32}>
                                            <span data-key={31}>
                                                <span data-offset-key="31:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={21}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: 179,
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={34}>
                                            <span data-key={33}>
                                                <span data-offset-key="33:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={22}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: 179,
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={36}>
                                            <span data-key={35}>
                                                <span data-offset-key="35:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr data-key={23}>
                                    <td
                                        data-key={24}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={38}>
                                            <span data-key={37}>
                                                <span data-offset-key="37:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={25}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={40}>
                                            <span data-key={39}>
                                                <span data-offset-key="39:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={26}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={42}>
                                            <span data-key={41}>
                                                <span data-offset-key="41:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr data-key={27}>
                                    <td
                                        data-key={28}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={44}>
                                            <span data-key={43}>
                                                <span data-offset-key="43:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={29}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={46}>
                                            <span data-key={45}>
                                                <span data-offset-key="45:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        data-key={30}
                                        className="NoteEditor__TableCellBlock"
                                        style={{
                                        borderStyle: 'solid',
                                        padding: 4,
                                        height: '1em',
                                        borderColor: 'rgb(0, 0, 0)',
                                        borderWidth: 1
                                    }}>
                                        <div data-key={48}>
                                            <span data-key={47}>
                                                <span data-offset-key="47:0">
                                                    <span data-slate-zero-width="n">​</span>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </ResizableTable>
                        <ul data-key={6}>
                            <li data-key={7}>
                                <span data-key={8}>
                                    <span data-offset-key="8:0">AASC00 AASC05 AASC10 AASC15 - -/- ცხელება -/--/-
                                        რომელიც არ საჭიროებს ჰოსპიტალიზაციას -/-</span>
                                </span>
                            </li>
                            <li data-key={9}>
                                <span data-key={10}>
                                    <span data-offset-key="10:0">AADA1A, AADC3A, AADA - -/- ცხელება -/--/- რომელიც
                                        არ საჭიროებს ჰოსპიტალიზაციას -/-</span>
                                </span>
                            </li>
                        </ul>
                        <div data-key={11}>
                            <span data-key={12}>
                                <span data-offset-key="12:0"></span>
                            </span>
                        </div>
                        <h4 data-key={13}>
                            <span data-key={14}>
                                <span data-offset-key="14:0">რეკომენდაციები:</span>
                            </span>
                        </h4>
                        <div data-key={15}>
                            <span data-key={16}>
                                <span data-offset-key="16:0">
                                    12312
                                </span>
                            </span>
                        </div>
                        <div data-key="0.2626464944184992">
                            <span data-key={49}>
                                <span data-offset-key="49:0">
                                    <span data-slate-zero-width="n">​</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResizableTableDemo;
