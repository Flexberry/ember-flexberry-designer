import uuid from 'npm:node-uuid';

export default function getJsonForDiagram(className, attributes) {
  let uuid1 = uuid.v4();
  let uuid2 = uuid.v4();
  let attributesStr = attributes.join('\n');
  let attributesHeight = 14 * attributes.length < 15 ? 15.0 : 14.0 * attributes.length;
  let maxAttributeStrLength = 0;
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].length > maxAttributeStrLength) {
      maxAttributeStrLength = attributes[i].length;
    }
  }

  let attributesWidth = maxAttributeStrLength < 14 ? 100.0 : 100.0 + (maxAttributeStrLength - 14) * 10;
  let attributesRight = maxAttributeStrLength < 14 ? 300.0 : 300.0 + (maxAttributeStrLength - 14) * 10;
  let attributesBottom = attributes.length < 2 ? 126.0 : 125.0 + (attributes.length - 1) * 14;

  let classObject = {
    $id: '{' + uuid1 + '}',
    $type: 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin',
    InitialFolded: false,
    Name: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: className,
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 200.0,
        Y: 110.0,
        Width: attributesWidth,
        Height: 15.0,
        Left: 200.0,
        Top: 110.0,
        Right: attributesRight,
        Bottom: 125.0,
        IsEmpty: false
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: 200,
        Y: 110
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: 100,
        Height: 15
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    AttributesTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: attributesStr,
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 200.0,
        Y: 111.0,
        Width: attributesWidth,
        Height: attributesHeight,
        Left: 200.0,
        Top: 111.0,
        Right: attributesRight,
        Bottom: attributesBottom,
        IsEmpty: false
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: 200,
        Y: 111
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: Math.floor(attributesWidth),
        Height: Math.floor(attributesHeight)
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    MethodsTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: ' ',
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 200.0,
        Y: 111.0,
        Width: attributesWidth,
        Height: 15.0,
        Left: 200.0,
        Top: 111.0,
        Right: attributesRight,
        Bottom: 126.0,
        IsEmpty: false
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: 200,
        Y: 111
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: Math.floor(attributesWidth),
        Height: 15
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    StereotypeTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: ' ',
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 200.0,
        Y: 110.0,
        Width: 0.0,
        Height: 100.0,
        Left: 200.0,
        Top: 110.0,
        Right: 200.0,
        Bottom: 210.0,
        IsEmpty: true
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: 200,
        Y: 110
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: 0,
        Height: 100
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: true,
      BracketStart: '«',
      BracketEnd: '»',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    CaseName: className,
    Folded: false,
    Location: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 200,
      Y: 110
    },
    Size: {
      $type: 'System.Drawing.Size, System.Drawing',
      IsEmpty: false,
      Width: Math.floor(attributesWidth),
      Height: 90
    },
    Valid: true,
    NeedToDragOthersControls: false,
    OldLocation: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 200,
      Y: 110
    },
    OldSize: {
      $type: 'System.Drawing.Size, System.Drawing',
      IsEmpty: false,
      Width: Math.floor(attributesWidth),
      Height: 90
    },
    DefaultSize: {
      $type: 'System.Drawing.Size, System.Drawing',
      IsEmpty: false,
      Width: 100,
      Height: 90
    },
    LinkedDiagramKeys: [],
    SelectInnerControls: false,
    WithLinkedDiagrams: false,
    Changed: true,
    Key: 0,
    ZOrder: 1.0,
    RepositoryObject: '{' + uuid2 + '}',
    Highlighted: false,
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
      TextColor: {
        $type: 'System.Drawing.Color, System.Drawing',
        R: 0,
        G: 0,
        B: 0,
        A: 255,
        IsKnownColor: true,
        IsEmpty: false,
        IsNamedColor: true,
        IsSystemColor: true,
        Name: 'WindowText'
      }
    },
    StopEvents: false
  };

  return classObject;
}
