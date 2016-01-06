---
layout: post
title: Rapid Guide on Two-Way Data Binding in Android
thumbnail: /post-content/2way-db.png
date: 2016-01-07
tags: [android, data-binding, mvvm]
category: guide
---

This post is **not** a comprehensive introduction to data binding in Android, it's a required minimum to get two-way data binding to work, that assumes your project to be configured for data binding already (If it's not, [start here](http://developer.android.com/tools/data-binding/guide.html))

**Complete source code available [here<sup><i class="mdi mdi-github-circle"></i></sup>](https://github.com/chester1000/Two-Way-Data-Binding).**

[![screenshot-main][app-looks]][app-looks]

##### Structure:

| role               | file                             |
|:-------------------|:---------------------------------|
| Activity:          | [`MainActivity.java`](#activity) |
| **M**odel:         | _not relevant here_              |
| **V**iew:          | [`activity_main.xml`](#view)     |
| **V**iew**M**odel: | [`MainState.java`](#state)       |

#### Activity

This one just glues stuff together:

```java
public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    ActivityMainBinding amb = DataBindingUtil.setContentView(this,
      R.layout.activity_main);

    final MainState ms = new MainState();
    amb.setState(ms);

    // Enable interface only after 2s for some reason
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        ms.fieldsEnabled.set(true);
      }
    }, 2000);
  }
}
```

#### View

Simple UI, with two `EditText`s and one `CheckBox`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools">

  <data>
    <variable
      name="state"
      type="com.meedamian.twoWayBinding.MainState" />
  </data>

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context=".MainActivity">

    <!-- Basic example -->
    <EditText
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:hint="Basic Field"

      android:text="@{state.basic}"
      android:enabled="@{state.fieldsEnabled}"

      android:addTextChangedListener="@{state.onBasicChanged}" />

    <!-- Basic + do sth on blur -->
    <EditText
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:hint="Blurable Field"

      android:text="@{state.blurable}"
      android:enabled="@{state.fieldsEnabled}"

      android:addTextChangedListener="@{state.onBlurableChanged}"
      android:onFocusChange="@{state.onBlurableFocusChange}" />

    <!-- Toggles UI availability -->
    <CheckBox
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:hint="Toggle interface"

      android:checked="@{state.fieldsEnabled}"

      android:onClick="@{state.onCheckedChanged}" />

  </LinearLayout>
</layout>
```

#### State

I hope the code speaks better than any comment I could put here, but if you have any doubts, ask in comments below.

```java
public class MainState extends BaseObservable {

  public final ObservableBoolean fieldsEnabled = new ObservableBoolean();

  // Basic EditText boilerplate
  private String basic;
  @Bindable
  public String getBasic() {
    return basic;
  }
  private void setBasicAtomic(String basic) {
    this.basic = basic;
  }
  public void setBasic(String basic) {
    setBasicAtomic(basic);
    notifyPropertyChanged(BR.basic);
  }
  public TextWatcher onBasicChanged = new SimpleTextWatcher() {
    @Override
    public void onTextChanged(String newBasic) {
      setBasicAtomic(newBasic);
    }
  };

  // Blurable EditText Boilerplate
  private String blurable;
  @Bindable
  public String getBlurable() {
    return blurable;
  }
  private void setBlurableAtomic(String blurable) {
    this.blurable = blurable;
  }
  public void setBlurable(String blurable) {
    setBlurableAtomic(blurable);
    notifyPropertyChanged(BR.blurable);
  }
  public TextWatcher onBlurableChanged = new SimpleTextWatcher() {
    @Override
    public void onTextChanged(String newBlurable) {
      setBlurableAtomic(newBlurable);
    }
  };
  public void onBlurableFocusChange(View v, boolean hasFocus) {
    if (!hasFocus)
      Toast.makeText(v.getContext(), "Field blurred", Toast.LENGTH_SHORT).show();
  }

  // CheckBox change listener
  public void onCheckedChanged(View v) {
    fieldsEnabled.set(((CheckBox) v).isChecked());
  }
}
```

> #### Complete source code available [here<sup><i class="mdi mdi-github-circle"></i></sup>](https://github.com/chester1000/Two-Way-Data-Binding).

[app-looks]: /post-content/2way-db.png
