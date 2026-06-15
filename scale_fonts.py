import re

with open('c:/Users/sayan/lms/Ubotz_2.0/edveo/src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('<!-- GO ONLINE SECTION START -->')
end_idx = content.find('<!-- GO ONLINE SECTION END -->')

if start_idx != -1 and end_idx != -1:
    end_idx += len('<!-- GO ONLINE SECTION END -->')
    block = content[start_idx:end_idx]
    
    # Scale up specific styles in the block
    replacements = {
        'padding:64px 32px;': 'padding:80px 24px;',
        'margin-bottom:48px;max-width:600px;': 'margin-bottom:56px;max-width:700px;',
        'font-size:11px;font-weight:600;letter-spacing:0.08em;color:#15803D;': 'font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;',
        'font-size:32px;font-weight:700;': 'font-size:38px;font-weight:800;letter-spacing:-0.03em;',
        'font-size:14px;color:#6B7280;line-height:1.6;': 'font-size:16px;color:#6B7280;line-height:1.6;',
        'margin-bottom:40px;max-width:900px;': 'margin-bottom:56px;max-width:1000px;',
        'padding:28px 24px;': 'padding:32px 28px;',
        'font-size:10px;font-weight:600;letter-spacing:0.06em;': 'font-size:12px;font-weight:700;letter-spacing:0.06em;',
        'font-size:14px;flex-shrink:0;': 'font-size:18px;flex-shrink:0;',
        'font-size:13px;color:#7F1D1D;': 'font-size:15px;color:#7F1D1D;',
        'font-size:11px;color:#DC2626;': 'font-size:13px;color:#DC2626;',
        'font-size:9px;font-weight:600;letter-spacing:0.08em;': 'font-size:11px;font-weight:700;letter-spacing:0.1em;',
        'font-size:18px;color:#4ADE80;': 'font-size:24px;color:#4ADE80;',
        'font-size:13px;color:#14532D;line-height:1.5;': 'font-size:15px;color:#14532D;line-height:1.5;font-weight:500;',
        'font-size:11px;color:#15803D;': 'font-size:13px;color:#15803D;',
        'width:36px;height:36px;': 'width:48px;height:48px;',
        'font-size:18px;': 'font-size:24px;',
        'font-size:13px;font-weight:600;color:#0F172A;': 'font-size:16px;font-weight:700;color:#0F172A;',
        'font-size:12px;color:#6B7280;line-height:1.5;': 'font-size:14px;color:#6B7280;line-height:1.6;',
        'font-size:11px;color:#DC2626;': 'font-size:13px;color:#DC2626;font-weight:500;',
        'padding:28px;max-width:900px;': 'padding:40px;max-width:1000px;',
        'font-size:10px;font-weight:600;letter-spacing:0.08em;color:#4ADE80;': 'font-size:12px;font-weight:700;letter-spacing:0.1em;color:#4ADE80;',
        'font-size:18px;font-weight:700;color:#fff;': 'font-size:24px;font-weight:700;color:#fff;',
        'font-size:12px;color:rgba(255,255,255,0.55);line-height:1.6;': 'font-size:15px;color:rgba(255,255,255,0.7);line-height:1.6;',
        'font-size:11px;color:rgba(255,255,255,0.7);': 'font-size:14px;color:rgba(255,255,255,0.8);',
        'padding:16px;border:1px solid': 'padding:24px;border:1px solid',
        'width:28px;height:28px;': 'width:40px;height:40px;',
        'font-size:10px;font-weight:600;flex-shrink:0;': 'font-size:14px;font-weight:700;flex-shrink:0;',
        'font-size:11px;font-weight:500;color:#fff;': 'font-size:15px;font-weight:600;color:#fff;',
        'font-size:9px;color:rgba(255,255,255,0.4);': 'font-size:12px;color:rgba(255,255,255,0.5);',
        'font-size:9px;font-weight:600;letter-spacing:0.06em;color:rgba(255,255,255,0.3);': 'font-size:11px;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.4);',
        'font-size:10px;color:rgba(255,255,255,0.6);width:110px;': 'font-size:13px;color:rgba(255,255,255,0.7);width:140px;',
        'height:5px;': 'height:8px;',
        'border-radius:3px;': 'border-radius:4px;',
        'font-size:9px;font-weight:600;color:#4ADE80;min-width:28px;': 'font-size:12px;font-weight:700;color:#4ADE80;min-width:36px;',
        'font-size:9px;font-weight:600;color:#FBBF24;min-width:28px;': 'font-size:12px;font-weight:700;color:#FBBF24;min-width:36px;',
        'font-size:9px;font-weight:600;color:#F87171;min-width:28px;': 'font-size:12px;font-weight:700;color:#F87171;min-width:36px;',
        'font-size:10px;color:#F87171;font-weight:500;': 'font-size:13px;color:#F87171;font-weight:600;',
        'padding:24px 28px;max-width:900px;': 'padding:32px 36px;max-width:1000px;',
        'font-size:15px;font-weight:600;color:#0F172A;': 'font-size:20px;font-weight:700;color:#0F172A;',
        'font-size:13px;color:#6B7280;line-height:1.5;': 'font-size:15px;color:#6B7280;line-height:1.6;',
        'padding:6px 12px;font-size:11px;': 'padding:8px 16px;font-size:14px;',
        'font-size:10px;color:#9CA3AF;': 'font-size:12px;color:#9CA3AF;'
    }
    
    new_block = block
    for old, new in replacements.items():
        new_block = new_block.replace(old, new)
        
    new_content = content[:start_idx] + new_block + content[end_idx:]
    with open('c:/Users/sayan/lms/Ubotz_2.0/edveo/src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replacements done.")
else:
    print("Block not found")
