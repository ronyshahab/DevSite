import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "./textEditor.css";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BoldIcon from "../../../assets/icons/b-solid.svg";
import ItalicIcon from "../../../assets/icons/info-solid.svg";
import UnderlineIcon from "../../../assets/icons/u-solid.svg";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import BootStrapDropDown from "../BootstrapDropDown";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import CodeIcon from "../../../assets/icons/code-solid.svg";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import HighlighIcon from "../../../assets/icons/pencil-solid.svg";
import Image from "@tiptap/extension-image";
import ImageIcon from "../../../assets/icons/image-solid.svg";
import Link from "@tiptap/extension-link";
import LinkIcon from "../../../assets/icons/link-solid.svg";
import Placeholder from "@tiptap/extension-placeholder";
import History from "@tiptap/extension-history";
import HistoryIcon from "../../../assets/icons/clock-rotate-left-solid.svg";
import Strike from "@tiptap/extension-strike";
import StrikeIcon from "../../../assets/icons/strikethrough-solid.svg";
import Subscript from "@tiptap/extension-subscript";
import SubscriptIcon from "../../../assets/icons/subscript-solid.svg";
import Superscript from "@tiptap/extension-superscript";
import SuperscriptIcon from "../../../assets/icons/superscript-solid.svg";
import TextAlign from "@tiptap/extension-text-align";

const limit = 1200;

const TextEditor = ({ onSubmit }) => {
  const [content, setContent] = useState();
  const [highLightColor, setHighLightColor] = useState("#FFF59D");
  const [imgArray, setImgArray] = useState([]);

  const handleSubmit = () => {
    onSubmit(editor.getJSON());
  };
  const handleFileInputChange = (e) => {
    const files = e.target.files;

    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;

        editor
          .chain()
          .focus()
          .setImage({ src: reader.result })
          .insertContentAt(editor.state.selection.$to.pos, {
            type: "placeholder",
          })
          .run();
      };
      reader.readAsDataURL(file);
    });
  };

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
      Code,
      CodeBlock,
      Color,
      TextStyle,
      Strike,
      Subscript,
      Superscript,
      TextAlign,
      History.configure({
        depth: 10,
        newGroupDelay: 500,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write something…",
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      CharacterCount.configure({
        limit,
      }),
      Heading.configure({
        levels: [3, 4, 5],
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content,
  });

  const fileInputRef = useRef();

  const listMainButton = {
    hasIcon: false,
    src: "Lists",
  };

  const listButtonList = [
    {
      src: "Toggle",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      hasIcon: false,
    },
    {
      src: "Insert",
      onClick: () => editor.chain().focus().sinkListItem("listItem").run(),
      hasIcon: false,
    },
    {
      src: "Takout",
      onClick: () => editor.chain().focus().liftListItem("listItem").run(),
      hasIcon: false,
    },
  ];

  const codeMainButton = {
    hasIcon: true,
    src: CodeIcon,
  };
  const codeButtonList = [
    {
      src: "Code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      hasIcon: false,
    },
    {
      src: "CodeBlock",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      hasIcon: false,
    },
  ];

  const headingMainButton = {
    hasIcon: false,
    src: "Headings",
  };

  const headingButtonList = [
    {
      src: "h3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      hasIcon: false,
    },
    {
      src: "h4",
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      hasIcon: false,
    },
    {
      src: "h5",
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      hasIcon: false,
    },
  ];
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="textEditorContainer">
      <div className="textEditorHeaderContainer">
        {editor.storage.characterCount.words()}/{limit} words
        <div className="textEditorButtonContainer">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className={`textEditorButton`}
          >
            <img src={HistoryIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className={`textEditorButton redoButton`}
          >
            <img src={HistoryIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`textEditorButton ${
              editor.isActive("bold") ? "activeButton" : ""
            }`}
          >
            <img src={BoldIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            className={`textEditorButton ${
              editor.isActive("italic") ? "activeButton" : ""
            }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <img src={ItalicIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            className={`textEditorButton ${
              editor.isActive("underline") ? "activeButton" : ""
            }`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <img src={UnderlineIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            className={`textEditorButton ${
              editor.isActive("strike") ? "activeButton" : ""
            }`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <img src={StrikeIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <input
            type="color"
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />
        </div>
        <div className="textEditorButtonContainer inputColorButtonContainer">
          <button
            className={`textEditorButton ${
              editor.isActive("highlight") ? "activeButton" : ""
            }`}
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleHighlight({ color: highLightColor })
                .run();
            }}
          >
            <img src={HighlighIcon} className="icon" alt="" />
          </button>
          <input
            type="color"
            onInput={(event) => {
              setHighLightColor(event.target.value);
            }}
            value={highLightColor}
            data-testid="setColor"
          />
        </div>
        <div className="textEditorButtonContainer">
          <button className={`textEditorButton`} onClick={handleFileInputClick}>
            <img src={ImageIcon} className="icon" alt="" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onInput={handleFileInputChange}
            multiple
          />
        </div>
        <div className="textEditorButtonContainer">
          <button
            className={`textEditorButton ${
              editor.isActive("link") ? "activeButton" : ""
            }`}
            onClick={() => editor.chain().focus().toggleLink().run()}
          >
            <img src={LinkIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`textEditorButton ${
              editor.isActive("subscript") ? "activeButton" : ""
            }`}
          >
            <img src={SubscriptIcon} className="icon" alt="" />
          </button>
        </div>
        <div className="textEditorButtonContainer">
          <button
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`textEditorButton ${
              editor.isActive("superscript") ? "activeButton" : ""
            }`}
          >
            <img src={SuperscriptIcon} className="icon" alt="" />
          </button>
        </div>
      </div>
      <BootStrapDropDown
        mainButton={listMainButton}
        buttonList={listButtonList}
      />
      <BootStrapDropDown
        mainButton={codeMainButton}
        buttonList={codeButtonList}
      />
      <BootStrapDropDown
        mainButton={headingMainButton}
        buttonList={headingButtonList}
      />
      <div className="textEditorContent">
        <EditorContent editor={editor} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit{" "}
      </button>
    </div>
  );
};

export default TextEditor;
