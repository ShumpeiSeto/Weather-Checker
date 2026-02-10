export const WEATHER_KNOWLEDGE = {
  symbols: {
    title: "天気記号の見方",
    description: "天気予報で使われる様々な記号や用語の意味を解説します。",
    content: (
      <div className="weather-content">
        <h3 className="content-subtitle">主な天気記号</h3>
        <ul className="weather-list">
          <li>
            <span className="weather-icon">☀️</span> <strong>晴れ</strong>:
            雲がほとんどなく、日差しがたっぷり
          </li>
          <li>
            <span className="weather-icon">⛅</span>{" "}
            <strong>晴れ時々曇り</strong>: 晴れの時間が多いが、雲も出現
          </li>
          <li>
            <span className="weather-icon">☁️</span> <strong>曇り</strong>:
            空が雲で覆われている状態
          </li>
          <li>
            <span className="weather-icon">🌧️</span> <strong>雨</strong>:
            傘や雨具が必要
          </li>
          <li>
            <span className="weather-icon">🌩️</span> <strong>雷雨</strong>:
            雷を伴う雨、屋外活動に注意
          </li>
          <li>
            <span className="weather-icon">❄️</span> <strong>雪</strong>:
            路面凍結に注意
          </li>
        </ul>

        <h3 className="content-subtitle">降水確率の見方</h3>
        <ul className="probability-list">
          <li>
            <span className="probability-range">0〜30%</span>:
            雨はほとんど降らない
          </li>
          <li>
            <span className="probability-range">30〜50%</span>: 小雨の可能性
          </li>
          <li>
            <span className="probability-range">50〜70%</span>:
            雨が降る可能性が高い
          </li>
          <li>
            <span className="probability-range">70%以上</span>: 雨がほぼ確実
          </li>
        </ul>

        <h3 className="content-subtitle">風向と風速</h3>
        <ul className="wind-list">
          <li>
            <strong>風向き</strong>: 矢印の向きは風が吹いてくる方向
          </li>
          <li>
            <strong>風速</strong>: m/s (メートル毎秒)で表示
          </li>
          <li>
            <span className="wind-speed">1〜3m/s</span>: そよ風程度
          </li>
          <li>
            <span className="wind-speed">5〜8m/s</span>: やや強い風
          </li>
          <li>
            <span className="wind-speed">10m/s以上</span>: 強風、注意が必要
          </li>
        </ul>
      </div>
    ),
  },
  forecasting: {
    title: "天気予報のしくみ",
    description: "現代の天気予報がどのように作られるかを解説します。",
    content: (
      <div className="weather-content">
        <h3 className="content-subtitle">データ収集</h3>
        <ul className="data-collection-list">
          <li>
            <strong>気象衛星</strong>: 上空からの雲の観測
          </li>
          <li>
            <strong>地上観測所</strong>: 気温・湿度・気圧などの測定
          </li>
          <li>
            <strong>気象レーダー</strong>: 雨や雪の分布と強さを測定
          </li>
        </ul>

        <h3 className="content-subtitle">予報作成プロセス</h3>
        <ol className="process-list">
          <li>データ収集: 世界中から気象データを集める</li>
          <li>データ解析: スーパーコンピュータで処理</li>
          <li>予測モデル: 数値計算で未来の状態を予測</li>
          <li>予報作成: 気象予報士による解析と調整</li>
        </ol>

        <h3 className="content-subtitle">予報の精度</h3>
        <ul className="accuracy-list">
          <li>
            <strong>短期(1〜3日)</strong>: 約80%の精度
          </li>
          <li>
            <strong>中期(4〜7日)</strong>: 約70%の精度
          </li>
          <li>
            <strong>長期</strong>: 精度は大幅に下がる
          </li>
        </ul>
      </div>
    ),
  },
  seasons: {
    title: "季節と気象現象",
    description: "日本の四季の特徴的な気象現象を紹介します。",
    content: (
      <div className="weather-content">
        <h3 className="content-subtitle">春 (3月〜5月)</h3>
        <ul className="season-list">
          <li>
            <strong>春一番</strong>: 立春後の最初の強い南風
          </li>
          <li>
            <strong>花粉飛散</strong>: スギ・ヒノキの花粉に注意
          </li>
          <li>気温の上下が大きい季節</li>
        </ul>

        <h3 className="content-subtitle">夏 (6月〜8月)</h3>
        <ul className="season-list">
          <li>
            <strong>梅雨</strong>: 長雨の季節
          </li>
          <li>
            <strong>台風</strong>: 強風と大雨に警戒
          </li>
          <li>
            <strong>猛暑日</strong>: 35℃以上の厳しい暑さ
          </li>
        </ul>

        <h3 className="content-subtitle">秋 (9月〜11月)</h3>
        <ul className="season-list">
          <li>
            <strong>秋雨前線</strong>: 長く続く雨
          </li>
          <li>
            <strong>台風シーズン</strong>: 9月は特に注意
          </li>
          <li>朝晩の気温差が大きくなる</li>
        </ul>

        <h3 className="content-subtitle">冬 (12月〜2月)</h3>
        <ul className="season-list">
          <li>
            <strong>冬型の気圧配置</strong>: 西高東低
          </li>
          <li>
            <strong>季節風</strong>: 日本海側に大雪
          </li>
          <li>
            <strong>乾燥</strong>: 湿度の低下で健康に注意
          </li>
        </ul>
      </div>
    ),
  },
  tips: {
    title: "天気と生活の知恵",
    description: "天気予報を日常生活に活かすための実用的なアドバイスです。",
    content: (
      <div className="weather-content">
        <h3 className="content-subtitle">天気別の服装選び</h3>
        <ul className="tips-list">
          <li>
            <strong>晴れ</strong>: UV対策、通気性の良い服
          </li>
          <li>
            <strong>雨</strong>: 撥水素材、滑りにくい靴
          </li>
          <li>
            <strong>強風</strong>: 裾や袖がバタつかない服装
          </li>
          <li>
            <strong>寒暖差</strong>: 重ね着で調節できる服装
          </li>
        </ul>

        <h3 className="content-subtitle">天気と体調管理</h3>
        <ul className="tips-list">
          <li>
            <strong>低気圧接近時</strong>: 頭痛に注意、水分補給を
          </li>
          <li>
            <strong>高湿度</strong>: こまめな水分補給、通気性の良い服
          </li>
          <li>
            <strong>低湿度</strong>: 加湿器、保湿クリームの使用
          </li>
        </ul>

        <h3 className="content-subtitle">天気アプリの活用法</h3>
        <ul className="tips-list">
          <li>雨雲レーダーで降雨予測を確認</li>
          <li>1時間ごとの予報で外出計画を調整</li>
          <li>複数の情報源で予報を比較する</li>
        </ul>
      </div>
    ),
  },
};
